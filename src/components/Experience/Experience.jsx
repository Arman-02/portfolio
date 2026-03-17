import { useRef, useEffect, useState } from 'react'
import Reveal from '../Reveal/Reveal'
import styles from './Experience.module.css'

const WORK = [
  {
    title: 'AI Intern',
    meta: 'KNOW LOCTOC PTE. LTD. · Singapore',
    date: 'JAN 2025 — JUL 2025',
    desc: 'Engineered multi-image analysis with Vertex AI & GPT-4o (95% accuracy). Built feedback pipeline with FastAPI & Milvus (F1: 0.87). Designed RAG-based quiz generation aligned with Bloom\'s Taxonomy.',
  },
  {
    title: 'AI/ML Intern',
    meta: 'Sequel String AI · India',
    date: 'APR 2024 — JUL 2024',
    desc: 'Automated image-to-data pipeline for meter readings (+40% throughput). Built document scanning with edge detection & perspective transformation. Integrated language detection with neural machine translation.',
  },
]

const EDUCATION = [
  { title: 'Northeastern University — MS in AI', meta: 'Boston, MA', date: 'Expected: 2027' },
  { title: 'NMIMS MPSTME — BTech in AI', meta: 'Mumbai, India', date: 'Graduated: 2025' },
]

function ExpCard({ title, meta, date, desc }) {
  return (
    <div className={styles.expCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardMeta}>{meta}</p>
        </div>
        <span className={styles.cardDate}>{date}</span>
      </div>
      {desc && <p className={styles.cardDesc}>{desc}</p>}
    </div>
  )
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('work')
  const [pillStyle, setPillStyle] = useState({})
  const tabWorkRef = useRef(null)
  const tabEduRef = useRef(null)
  const containerRef = useRef(null)

  const updatePill = (tab) => {
    const btn = tab === 'work' ? tabWorkRef.current : tabEduRef.current
    const container = containerRef.current
    if (btn && container) {
      const cr = container.getBoundingClientRect()
      const br = btn.getBoundingClientRect()
      const offset = br.left - cr.left - 4
      setPillStyle({ width: `${br.width}px`, transform: `translateX(${offset}px)` })
    }
  }

  useEffect(() => {
    updatePill(activeTab)
    const onResize = () => updatePill(activeTab)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeTab])

  const switchTab = (tab) => {
    setActiveTab(tab)
    updatePill(tab)
  }

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="up" className={styles.header}>
          <span className={styles.label}>Experience</span>
          <h2 className={styles.title}>Work & Education</h2>
        </Reveal>

        <Reveal variant="scale" delay={120}>
          <div className={styles.tabsPill} role="tablist" ref={containerRef}>
            <span className={styles.tabPill} style={pillStyle} aria-hidden="true" />
            <button
              ref={tabWorkRef}
              type="button"
              role="tab"
              aria-selected={activeTab === 'work'}
              className={`${styles.tabBtn} ${activeTab === 'work' ? styles.active : ''}`}
              onClick={() => switchTab('work')}
            >
              Work
            </button>
            <button
              ref={tabEduRef}
              type="button"
              role="tab"
              aria-selected={activeTab === 'education'}
              className={`${styles.tabBtn} ${activeTab === 'education' ? styles.active : ''}`}
              onClick={() => switchTab('education')}
            >
              Education
            </button>
          </div>

          <div
            role="tabpanel"
            id="panel-work"
            className={activeTab === 'work' ? styles.tabPanel : `${styles.tabPanel} ${styles.hidden}`}
          >
            <div className={`${styles.spaceY} ${styles.spaceYLarge}`}>
              {WORK.map((item) => (
                <ExpCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            id="panel-education"
            className={activeTab === 'education' ? styles.tabPanel : `${styles.tabPanel} ${styles.hidden}`}
          >
            <div className={styles.spaceY} style={{ maxWidth: '42rem' }}>
              {EDUCATION.map((item) => (
                <ExpCard key={item.title} title={item.title} meta={item.meta} date={item.date} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
