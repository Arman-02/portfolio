import { useState, useEffect } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setWidth(pct)
    }
    window.addEventListener('scroll', update)
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className={styles.scrollProgress} style={{ width: `${width}%` }} aria-hidden="true" />
}
