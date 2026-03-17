import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>© 2025 Arman Motiwala</p>
        <p className={styles.tagline}>Built with passion for AI</p>
      </div>
    </footer>
  )
}
