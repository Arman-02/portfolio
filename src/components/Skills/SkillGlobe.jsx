import { useEffect, useMemo, useRef } from 'react'
import styles from './SkillGlobe.module.css'

const GOLDEN = Math.PI * (3 - Math.sqrt(5))
const AUTO_SPIN = 0.00025 // rad per ms

// Evenly spread n points over a unit sphere
function fibonacciSphere(n) {
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    return [Math.cos(GOLDEN * i) * r, y, Math.sin(GOLDEN * i) * r]
  })
}

function rotate([x, y, z], ry, rx) {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry)
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
  return [x1, y * Math.cos(rx) - z1 * Math.sin(rx), y * Math.sin(rx) + z1 * Math.cos(rx)]
}

const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a))

/*
 * skills: [{ name, icon, short }] — icon is a simple-icons entry or null (falls back to `short`)
 * activeName: skill to rotate to the front and highlight
 */
export default function SkillGlobe({ skills, activeName }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const itemRefs = useRef([])
  const activeRef = useRef(activeName)
  activeRef.current = activeName

  const points = useMemo(() => fibonacciSphere(skills.length), [skills.length])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let size = 0
    let dpr = 1
    let ry = 0.6
    let rx = -0.25
    let vy = 0
    let vx = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let visible = true
    let raf = 0
    let last = performance.now()
    let lineColor = '255,255,255'

    const readTheme = () => {
      lineColor = document.documentElement.getAttribute('data-theme') === 'light' ? '15,23,42' : '255,255,255'
    }

    const resize = () => {
      size = wrap.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = size * dpr
      canvas.height = size * dpr
    }

    const drawWireframe = (R) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      const c = size / 2
      const curves = []
      for (let k = 1; k < 6; k++) {
        const lat = -Math.PI / 2 + (k * Math.PI) / 6
        curves.push((t) => [Math.cos(lat) * Math.cos(t), Math.sin(lat), Math.cos(lat) * Math.sin(t)])
      }
      for (let k = 0; k < 6; k++) {
        const lon = (k * Math.PI) / 6
        curves.push((t) => [Math.cos(t) * Math.cos(lon), Math.sin(t), Math.cos(t) * Math.sin(lon)])
      }
      // Back half faint, front half brighter
      for (const front of [false, true]) {
        ctx.beginPath()
        for (const curve of curves) {
          let prev = null
          for (let s = 0; s <= 72; s++) {
            const [x, y, z] = rotate(curve((s / 72) * Math.PI * 2), ry, rx)
            const p = [c + x * R, c + y * R]
            if (prev && (z >= 0) === front) {
              ctx.moveTo(prev[0], prev[1])
              ctx.lineTo(p[0], p[1])
            }
            prev = p
          }
        }
        ctx.strokeStyle = `rgba(${lineColor},${front ? 0.12 : 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(c, c, R, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${lineColor},0.14)`
      ctx.stroke()
    }

    const frame = (now) => {
      const dt = Math.min(48, now - last)
      last = now
      const R = size * 0.4

      const activeIndex = skills.findIndex((s) => s.name === activeRef.current)
      if (activeIndex >= 0 && !dragging) {
        // Ease the active skill to the front
        const [x, y, z] = points[activeIndex]
        const targetRy = Math.atan2(-x, z)
        const targetRx = Math.atan2(y, Math.hypot(x, z))
        ry += wrapAngle(targetRy - ry) * 0.12
        rx += (targetRx - rx) * 0.12
        vy = 0
        vx = 0
      } else if (!dragging) {
        ry += vy * dt + (reduceMotion ? 0 : AUTO_SPIN * dt)
        rx += vx * dt
        rx += (-0.25 - rx) * 0.02 // drift back to a slight tilt
        vy *= 0.94
        vx *= 0.94
      }

      drawWireframe(R)
      points.forEach((p, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        const [x, y, z] = rotate(p, ry, rx)
        const depth = (z + 1) / 2
        el.style.transform = `translate(-50%, -50%) translate3d(${x * R}px, ${y * R}px, 0) scale(${0.55 + depth * 0.5})`
        el.style.opacity = String(0.15 + depth * 0.85)
        el.style.zIndex = String(Math.round(depth * 100))
      })

      raf = visible ? requestAnimationFrame(frame) : 0
    }

    const onPointerDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      wrap.setPointerCapture(e.pointerId)
      wrap.classList.add(styles.grabbing)
    }
    const onPointerMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      ry += dx * 0.006
      rx = Math.max(-1.2, Math.min(1.2, rx - dy * 0.006))
      vy = (dx * 0.006) / 16
      vx = (-dy * 0.006) / 16
    }
    const onPointerUp = () => {
      dragging = false
      wrap.classList.remove(styles.grabbing)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })

    resize()
    readTheme()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    io.observe(wrap)
    const mo = new MutationObserver(readTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
    }
  }, [points, skills])

  return (
    <div ref={wrapRef} className={styles.globe} aria-hidden="true">
      <div className={styles.glow} />
      <canvas ref={canvasRef} className={styles.canvas} />
      {skills.map((s, i) => (
        <div
          key={s.name}
          ref={(el) => (itemRefs.current[i] = el)}
          className={`${styles.item} ${s.name === activeName ? styles.itemActive : ''}`}
        >
          {s.icon ? (
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d={s.icon.path} fill="currentColor" />
            </svg>
          ) : (
            <span className={styles.text}>{s.short || s.name}</span>
          )}
          <span className={styles.label}>{s.name}</span>
        </div>
      ))}
    </div>
  )
}
