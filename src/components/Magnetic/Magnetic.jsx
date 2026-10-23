import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

// Pulls its child toward the cursor while hovered, then springs back.
export default function Magnetic({ children, strength = 0.35, className, style }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  const onPointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', x, y, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
