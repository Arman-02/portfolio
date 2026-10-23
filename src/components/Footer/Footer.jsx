import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>© {new Date().getFullYear()} Arman Motiwala</p>
        <a href="#home" className={styles.tagline}>Back to top ↑</a>
      </div>
    </footer>
  )
}
