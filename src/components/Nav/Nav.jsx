import { useTheme } from '../../context/ThemeContext'
import styles from './Nav.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          ARMAN
        </a>
        <div className={styles.navRight}>
          <div className={styles.links}>
            {links.map(({ href, label }) => (
              <a key={href} href={href} className={styles.navLink}>
                {label}
              </a>
            ))}
          </div>
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
        </div>
      </div>
    </nav>
  )
}
