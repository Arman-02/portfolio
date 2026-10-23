import Lenis from 'lenis'

let lenis = null

export function initSmoothScroll() {
  if (lenis) return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.9 })
  return lenis
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function scrollToTarget(target, offset = 0) {
  if (lenis) {
    // force: still scroll if a menu just stopped Lenis on the same click
    lenis.scrollTo(target, { offset, duration: 1.4, force: true })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}

// Freeze page scroll while a modal is open (works with and without Lenis)
export function lockScroll(locked) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
