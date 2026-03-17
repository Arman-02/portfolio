import Reveal from '../Reveal/Reveal'
import styles from './Research.module.css'

const ACHIEVEMENTS = [
  { name: 'Datathon 2.0 Finalist', meta: '2024', emoji: '🏆' },
  { name: 'Cyber Cypher 3.0 Finalist', meta: 'Advanced Level · 2024', emoji: '🏆' },
  { name: 'Tata Imagination Challenge 2024', meta: 'Student Track Participant · Unstop', emoji: '🎯' },
]

const CERTIFICATIONS = [
  {
    provider: 'IBM',
    items: [
      { name: 'Fundamentals of AI Agents Using RAG and LangChain', meta: 'Jun 2025 · AI, NLP' },
      { name: 'Machine Learning with Python', meta: 'Jun 2024 · ML, Python' },
    ],
  },
  {
    provider: 'Google Cloud · Coursera',
    items: [
      { name: 'Multimodal RAG using Vertex AI Gemini API', meta: 'Jan 2025 · AI, GCP' },
    ],
  },
]

export default function Research() {
  return (
    <section id="research" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="up" className={styles.header}>
          <span className={styles.label}>Publications</span>
          <h2 className={styles.title}>Research</h2>
        </Reveal>

        <Reveal variant="scale" delay={100} style={{ marginBottom: '6rem' }}>
          <div className={styles.paperCard}>
            <div className={styles.paperInner}>
              <div className={styles.paperIcon}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.paperTitle}>Auto-Assess: Automated Code Evaluation Platform for Enhanced SQL Learning</h3>
                <p className={styles.paperAuthors}>M. A. Motiwala, A. Joshi, and R. Chapaneri</p>
                <p className={styles.paperVenue}>2025 IEEE International Students' Conference on Electrical, Electronics and Computer Science (SCEECS)</p>
                <div className={styles.badges}>
                  <span className={`${styles.badge} ${styles.badgeRed}`}>IEEE SCEECS 2025</span>
                  <span className={`${styles.badge} ${styles.badgeGreen}`}>Published</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={180}>
          <div className={styles.grid}>
            <div>
              <div className={styles.columnTitle}>
                <div className={styles.columnIcon}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className={styles.columnHeading}>Achievements</h3>
              </div>
              <div className={styles.achievementList}>
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.name} className={styles.achievementItem}>
                    <span className={styles.achievementEmoji}>{a.emoji}</span>
                    <div>
                      <h4 className={styles.achievementName}>{a.name}</h4>
                      <p className={styles.achievementMeta}>{a.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.columnTitle}>
                <div className={`${styles.columnIcon} ${styles.columnIconGreen}`}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className={styles.columnHeading}>Certifications</h3>
              </div>
              <div className={styles.spaceY}>
                {CERTIFICATIONS.map((group) => (
                  <div key={group.provider} className={styles.certGroup}>
                    <div className={styles.certGroupLabel}>
                      <span className={styles.certGroupText}>{group.provider}</span>
                      <div className={styles.certGroupLine} />
                    </div>
                    <div className={styles.certList}>
                      {group.items.map((item) => (
                        <div key={item.name} className={styles.certItem}>
                          <p className={styles.certName}>{item.name}</p>
                          <p className={styles.certMeta}>{item.meta}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
