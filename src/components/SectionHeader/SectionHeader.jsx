import Reveal from '../Reveal/Reveal'
import styles from './SectionHeader.module.css'

export default function SectionHeader({ label, title, children, className = '' }) {
  return (
    <Reveal variant="up" className={`${styles.header} ${className}`.trim()}>
      <span className={styles.label}>
        <span className={styles.labelLine} aria-hidden="true" />
        {label}
      </span>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.subtitle}>{children}</p>}
    </Reveal>
  )
}
