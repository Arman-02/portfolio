import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { useTheme } from '../../context/ThemeContext'
import { lockScroll } from '../../lib/smoothScroll'
import Magnetic from '../Magnetic/Magnetic'
import styles from './Nav.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const EASE = [0.76, 0, 0.24, 1]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const reduceMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(!menuOpen && current > previous && current > 150)
  })

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    // #home clears the highlight when back at the top
    ;['#home', ...links.map((l) => l.href)].forEach((href) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    lockScroll(menuOpen)
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <motion.nav
        className={styles.nav}
        animate={{ y: hidden ? '-100%' : '0%', opacity: hidden ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
      >
        <div className={styles.inner}>
          <a href="#home" className={styles.logo} onClick={() => setMenuOpen(false)}>
            ARMAN<span className={styles.logoDot}>.</span>
          </a>
          <div className={styles.navRight}>
            <div className={styles.links}>
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`${styles.navLink} ${active === href ? styles.navLinkActive : ''}`}
                >
                  {label}
                </a>
              ))}
            </div>
            <Magnetic strength={0.4}>
              <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </Magnetic>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarTopOpen : ''}`} />
              <span className={`${styles.menuBar} ${menuOpen ? styles.menuBarBottomOpen : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.menu}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          >
            <nav className={styles.menuLinks} aria-label="Mobile">
              {links.map(({ href, label }, i) => (
                <span key={href} className={styles.menuMask}>
                  <motion.a
                    href={href}
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE, delay: reduceMotion ? 0 : 0.15 + i * 0.05 }}
                  >
                    <span className={styles.menuIndex}>0{i + 1}</span>
                    {label}
                  </motion.a>
                </span>
              ))}
            </nav>
            <div className={styles.menuFooter}>
              <a href="mailto:armanmotiwala02@gmail.com">armanmotiwala02@gmail.com</a>
              <a href="https://github.com/Arman-02" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/mohommed-arman-motiwala-594111219" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
