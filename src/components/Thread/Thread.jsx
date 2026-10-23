import { useEffect, useRef } from 'react'
import styles from './Thread.module.css'

/*
 * The red ribbon from the hero, kept on screen for the whole page.
 * It is a single polyline of N points whose shape is a weighted blend of:
 *   - a drifting sine wave (hero ribbon -> thin background thread)
 *   - the Experience timeline track   ([data-thread="timeline"])
 *   - loops around the featured cards ([data-thread="card"])
 *   - a straight rule under the paper title ([data-thread="underline"])
 * Weights come from where those elements sit in the viewport, so the
 * thread morphs as you scroll. Drawn twice: a blurred low-res glow layer
 * and a sharp core line.
 */

const N = 600
const RIBBON = '#ff4d4d'

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

// Resample a polyline [x0, y0, x1, y1, ...] to N evenly spaced points
function resample(poly, out) {
  const count = poly.length / 2
  const lens = new Float32Array(count)
  for (let i = 1; i < count; i++) {
    lens[i] = lens[i - 1] + Math.hypot(poly[i * 2] - poly[i * 2 - 2], poly[i * 2 + 1] - poly[i * 2 - 1])
  }
  const total = lens[count - 1] || 1
  let seg = 1
  for (let k = 0; k < N; k++) {
    const target = (k / (N - 1)) * total
    while (seg < count - 1 && lens[seg] < target) seg++
    const span = lens[seg] - lens[seg - 1] || 1
    const t = clamp01((target - lens[seg - 1]) / span)
    out[k * 2] = lerp(poly[seg * 2 - 2], poly[seg * 2], t)
    out[k * 2 + 1] = lerp(poly[seg * 2 - 1], poly[seg * 2 + 1], t)
  }
}

function pushQuad(poly, x0, y0, cx, cy, x1, y1, steps = 24) {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const a = (1 - t) * (1 - t)
    const b = 2 * (1 - t) * t
    const c = t * t
    poly.push(a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1)
  }
}

// Clockwise loop around a rounded rect, starting/ending at the top-left of the top edge
function pushRoundedLoop(poly, r, gap, radius) {
  const L = r.left - gap
  const T = r.top - gap
  const R = r.right + gap
  const B = r.bottom + gap
  const rr = Math.min(radius + gap, (R - L) / 2, (B - T) / 2)
  const corner = (cx, cy, a0) => {
    for (let i = 1; i <= 8; i++) {
      const a = a0 + (i / 8) * (Math.PI / 2)
      poly.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr)
    }
  }
  poly.push(L + rr, T, R - rr, T)
  corner(R - rr, T + rr, -Math.PI / 2)
  poly.push(R, B - rr)
  corner(R - rr, B - rr, 0)
  poly.push(L + rr, B)
  corner(L + rr, B - rr, Math.PI / 2)
  poly.push(L, T + rr)
  corner(L + rr, T + rr, Math.PI)
}

function visibleRect(el) {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return r.height > 0 ? r : null
}

export default function Thread() {
  const glowRef = useRef(null)
  const coreRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const core = coreRef.current
    const gctx = glow.getContext('2d')
    const cctx = core.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const wave = new Float32Array(N * 2)
    const timeline = new Float32Array(N * 2)
    const cards = new Float32Array(N * 2)
    const underline = new Float32Array(N * 2)
    const pts = new Float32Array(N * 2)

    let W = 0
    let H = 0
    let dpr = 1
    let coreColor = RIBBON
    let raf = 0
    let time = 0
    let last = performance.now()

    const readTheme = () => {
      coreColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || RIBBON
    }

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      core.width = W * dpr
      core.height = H * dpr
      // Glow is blurred by CSS, so half resolution is plenty
      glow.width = W * 0.5
      glow.height = H * 0.5
    }

    const drawPath = (ctx, scale) => {
      ctx.beginPath()
      ctx.moveTo(pts[0] * scale, pts[1] * scale)
      for (let i = 1; i < N - 1; i++) {
        const mx = (pts[i * 2] + pts[i * 2 + 2]) / 2
        const my = (pts[i * 2 + 1] + pts[i * 2 + 3]) / 2
        ctx.quadraticCurveTo(pts[i * 2] * scale, pts[i * 2 + 1] * scale, mx * scale, my * scale)
      }
      ctx.lineTo(pts[N * 2 - 2] * scale, pts[N * 2 - 1] * scale)
    }

    const frame = (now) => {
      const dt = Math.min(64, now - last)
      last = now
      if (!reduceMotion) time += dt * 0.0006

      const scrollY = window.scrollY
      const heroK = 1 - smooth(0, H * 0.85, scrollY)

      // --- wave: the hero ribbon, thinning into a drifting thread
      const contactR = visibleRect(document.getElementById('contact'))
      const contactK = contactR ? smooth(H * 0.9, H * 0.2, contactR.top) : 0
      const amp = H * lerp(0.13, 0.25, Math.max(heroK, contactK * 0.7))
      const phase = time + scrollY * 0.0005
      for (let i = 0; i < N; i++) {
        const x = -0.1 * W + (i / (N - 1)) * 1.2 * W
        const xn = (2 * x - W) / Math.max(H, 600)
        wave[i * 2] = x
        wave[i * 2 + 1] = H / 2 + amp * Math.sin(xn + phase)
      }

      // --- timeline: swing in from the left, then run down the track to the fill point
      let tlW = 0
      const tlEls = document.querySelectorAll('[data-thread="timeline"]')
      let tlR = null
      tlEls.forEach((el) => { tlR = tlR || visibleRect(el) })
      if (tlR) {
        tlW = smooth(H * 0.95, H * 0.55, tlR.top) * smooth(H * 0.05, H * 0.45, tlR.bottom)
        if (tlW > 0) {
          const x0 = tlR.left + 0.5
          const fillY = Math.min(Math.max(H * 0.6, tlR.top), tlR.bottom)
          const poly = [-0.12 * W, tlR.top - H * 0.3]
          pushQuad(poly, -0.12 * W, tlR.top - H * 0.3, x0, tlR.top - H * 0.3, x0, tlR.top)
          poly.push(x0, fillY + 0.01)
          resample(new Float32Array(poly), timeline)
        }
      }

      // --- cards: loop around each featured card in turn
      let cardW = 0
      const cardRects = []
      document.querySelectorAll('[data-thread="card"]').forEach((el) => {
        const r = visibleRect(el)
        if (r) cardRects.push(r)
      })
      if (cardRects.length) {
        const top = Math.min(...cardRects.map((r) => r.top))
        const bottom = Math.max(...cardRects.map((r) => r.bottom))
        cardW = smooth(H * 0.95, H * 0.55, top) * smooth(H * 0.0, H * 0.4, bottom)
        if (cardW > 0) {
          const gap = W < 700 ? 8 : 14
          const first = cardRects[0]
          const poly = [-0.12 * W, first.top - H * 0.35]
          pushQuad(poly, -0.12 * W, first.top - H * 0.35, first.left - gap, first.top - H * 0.35, first.left + 24, first.top - gap)
          cardRects.forEach((r, i) => {
            if (i > 0) poly.push(r.left + 24, r.top - gap)
            pushRoundedLoop(poly, r, gap, 24)
          })
          const lastR = cardRects[cardRects.length - 1]
          pushQuad(poly, lastR.left + 24, lastR.top - gap, lastR.right + gap, lastR.top - gap, 1.12 * W, lastR.top + H * 0.2)
          resample(new Float32Array(poly), cards)
        }
      }

      // --- underline: flatten into a straight rule beneath the paper title
      let ulW = 0
      const ulR = visibleRect(document.querySelector('[data-thread="underline"]'))
      if (ulR) {
        ulW = smooth(H * 0.9, H * 0.6, ulR.top) * smooth(H * 0.1, H * 0.4, ulR.bottom)
        if (ulW > 0) {
          const y = ulR.bottom + 10
          for (let i = 0; i < N; i++) {
            underline[i * 2] = lerp(-0.12 * W, ulR.right, i / (N - 1))
            underline[i * 2 + 1] = y
          }
        }
      }

      const sum = tlW + cardW + ulW
      const norm = sum > 1 ? 1 / sum : 1
      tlW *= norm
      cardW *= norm
      ulW *= norm
      const waveW = 1 - tlW - cardW - ulW
      for (let i = 0; i < N * 2; i++) {
        pts[i] = wave[i] * waveW
          + (tlW ? timeline[i] * tlW : 0)
          + (cardW ? cards[i] * cardW : 0)
          + (ulW ? underline[i] * ulW : 0)
      }

      // --- style: thick soft ribbon in the hero, thin crisp thread elsewhere
      const focus = tlW + cardW + ulW
      const glowWidth = lerp(lerp(5, 30, contactK), 62, heroK)
      const glowAlpha = lerp(lerp(0.3, 0.6, Math.max(focus, contactK)), 0.95, heroK)
      const coreAlpha = lerp(lerp(0.45, 0.95, focus), 0, heroK)
      const coreWidth = lerp(1.25, 1.6, focus)

      gctx.clearRect(0, 0, glow.width, glow.height)
      gctx.lineCap = 'round'
      gctx.lineJoin = 'round'
      gctx.strokeStyle = RIBBON
      gctx.globalAlpha = glowAlpha
      gctx.lineWidth = glowWidth * 0.5
      drawPath(gctx, 0.5)
      gctx.stroke()

      cctx.clearRect(0, 0, core.width, core.height)
      if (coreAlpha > 0.01) {
        cctx.lineCap = 'round'
        cctx.lineJoin = 'round'
        cctx.strokeStyle = coreColor
        cctx.globalAlpha = coreAlpha
        cctx.lineWidth = coreWidth * dpr
        drawPath(cctx, dpr)
        cctx.stroke()
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    readTheme()
    document.documentElement.classList.add('has-thread')
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    const mo = new MutationObserver(readTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      mo.disconnect()
      document.documentElement.classList.remove('has-thread')
    }
  }, [])

  return (
    <div className={styles.thread} aria-hidden="true">
      <canvas ref={glowRef} className={styles.glow} />
      <canvas ref={coreRef} className={styles.core} />
    </div>
  )
}
