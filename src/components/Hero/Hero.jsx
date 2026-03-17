import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.section}>
      <div className={`${styles.floatShape} ${styles.floatShape1}`} />
      <div className={`${styles.floatShape} ${styles.floatShape2}`} />

      <div className={styles.wrapper}>
        <div className={styles.badgeRow}>
          <div className={styles.heroLine} />
          <span className={styles.badge}>AI/ML Engineer</span>
          <div className={`${styles.heroLine} ${styles.heroLineFlipped}`} />
        </div>

        <h1 className={styles.title}>
          Arman<br />Motiwala
        </h1>

        <p className={styles.subtitle}>
          Building intelligent systems at the intersection of research and engineering. Currently pursuing MS in AI at Northeastern.
        </p>

        <div className={styles.socials}>
          <a
            href="https://linkedin.com/in/mohommed-arman-motiwala-594111219"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.413-.103.249-.129.597-.129.946v5.446h-3.554s.05-8.736 0-9.637h3.554v1.362c.425-.654 1.185-1.586 2.882-1.586 2.105 0 3.685 1.377 3.685 4.344v5.517zM5.337 9.432c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.956-1.704 1.187 0 1.915.753 1.94 1.704 0 .946-.753 1.704-1.981 1.704zm1.581 11.02H3.819V9.815h3.099v10.637zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a
            href="https://github.com/Arman-02"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="mailto:armanmotiwala02@gmail.com" className={styles.socialLink} aria-label="Email">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>

      <a href="#about" className={styles.scrollCta}>
        <span>Scroll</span>
        <svg className={styles.bounce} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  )
}
