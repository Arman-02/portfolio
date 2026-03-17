import { useRef, useEffect, useState } from 'react'
import styles from './Reveal.module.css'

const VARIANTS = {
  up: styles.revealUp,
  left: styles.revealLeft,
  right: styles.revealRight,
  scale: styles.revealScale,
  fade: styles.revealFade,
  default: styles.reveal,
}

export default function Reveal({ children, variant = 'up', delay = 0, className = '', as: Component = 'div', ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timeoutId
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setVisible(true), delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [delay])

  const variantClass = VARIANTS[variant] || VARIANTS.default
  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <Component
      ref={ref}
      className={`${variantClass} ${visible ? styles.visible : ''} ${className}`.trim()}
      style={delayStyle}
      data-visible={visible ? 'true' : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}
