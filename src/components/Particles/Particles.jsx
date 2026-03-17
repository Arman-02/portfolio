import { useState, useEffect } from 'react'
import styles from './Particles.module.css'

export default function Particles() {
  const [active, setActive] = useState({ 0: false, 1: false, 2: false, 3: false })

  useEffect(() => {
    function update() {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setActive({
        0: pct > 15,
        1: pct > 30,
        2: pct > 45,
        3: pct > 60,
      })
    }
    window.addEventListener('scroll', update)
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className={styles.container}>
      <div className={`${styles.particle} ${styles.particle1} ${active[0] ? styles.active : ''}`} />
      <div className={`${styles.particle} ${styles.particle2} ${active[1] ? styles.active : ''}`} />
      <div className={`${styles.particle} ${styles.particle3} ${active[2] ? styles.active : ''}`} />
      <div className={`${styles.particle} ${styles.particle4} ${active[3] ? styles.active : ''}`} />
    </div>
  )
}
