import { useState } from 'react'
import styles from './BeforeAfter.module.css'

// Drag (or arrow-key) slider comparing a low-res input with the high-res target.
// An invisible full-size range input handles pointer, touch and keyboard.
export default function BeforeAfter({ low, high, alt, caption, credit }) {
  const [pos, setPos] = useState(50)

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <img src={high} alt={`${alt}, full resolution`} className={styles.img} draggable="false" />
        <img
          src={low}
          alt={`${alt}, low resolution`}
          className={`${styles.img} ${styles.low}`}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable="false"
        />
        <span className={`${styles.tag} ${styles.tagLeft}`}>Low-res input</span>
        <span className={`${styles.tag} ${styles.tagRight}`}>High-res target</span>
        <div className={styles.handle} style={{ left: `${pos}%` }} aria-hidden="true">
          <span className={styles.knob}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label="Comparison slider: low resolution versus high resolution"
        />
      </div>
      <figcaption className={styles.caption}>
        {caption}{' '}
        {credit && (
          <>
            Photo:{' '}
            <a href={credit.url} target="_blank" rel="noopener noreferrer">
              {credit.name}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  )
}
