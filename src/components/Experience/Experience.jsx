import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Reveal from '../Reveal/Reveal'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Experience.module.css'

const WORK = [
  {
    title: 'AI Engineer',
    meta: 'Northeastern University, D\'Amore-McKim AI Strategic Hub · Boston, MA',
    date: 'MAY 2026 — PRESENT',
    current: true,
    points: [
      'Build a full-stack AI-TA platform that delivers sub-2-second, RAG-grounded chat responses across 50+ course documents.',
      'Automated Canvas LMS synchronization and grading workflows for 6+ courses through a dual-deployment CI/CD pipeline.',
      'Developed Impact Connect, a role-based engagement platform connecting alumni and executive leaders with faculty and students across 5 user roles.',
      'Collaborated on MatchIQ, a human-in-the-loop pipeline matching 68K+ alumni records through confidence-scored name, location, and degree matching.',
    ],
    stack: ['Next.js 15', 'TypeScript', 'FastAPI', 'Qdrant', 'LlamaIndex', 'PostgreSQL', 'GitHub Actions'],
  },
  {
    title: 'Teaching Assistant, Strategic AI for Business (MISM 6250)',
    meta: 'Northeastern University, D\'Amore-McKim School of Business · Boston, MA',
    date: 'JUL 2026 — PRESENT',
  },
  {
    title: 'Software Developer Intern',
    meta: 'Know Loctoc · Singapore',
    date: 'JAN 2025 — JUL 2025',
    points: [
      'Achieved 95% visual-text alignment accuracy across 1,000+ product images; cut manual audit workload 90% through an NLP feedback pipeline (F1 0.87, ROC-AUC 0.91).',
      'Designed a RAG-based adaptive quiz system generating 6 Bloom’s Taxonomy-aligned question types, with adversarial robustness testing.',
    ],
    stack: ['Vertex AI', 'GPT-4o', 'FastAPI', 'Milvus', 'OpenAI API'],
  },
  {
    title: 'AI/ML Intern',
    meta: 'Sequel String AI · India',
    date: 'APR 2024 — JUL 2024',
    points: [
      'Boosted structured-data throughput 40% with an OpenCV + REST API pipeline processing 500+ utility-meter images daily.',
      'Extended multilingual accessibility across 3 regional languages with neural machine translation and language detection.',
    ],
    stack: ['OpenCV', 'REST APIs', 'NMT'],
  },
]

const EDUCATION = [
  {
    title: 'MS in Artificial Intelligence',
    meta: 'Northeastern University, Khoury College of Computer Sciences · Boston, MA',
    date: 'SEP 2025 — DEC 2027',
    current: true,
    points: ['Coursework: Algorithms, Foundations of AI, Machine Learning and Pattern Recognition, Reinforcement Learning, NLP'],
  },
  {
    title: 'BTech in Artificial Intelligence',
    meta: 'NMIMS Mukesh Patel School of Technology Management and Engineering · Mumbai, India',
    date: 'JUL 2021 — MAY 2025',
    points: ['Coursework: Machine Learning, Deep Learning, NLP, Recommendation Systems, Computer Vision, Blockchain Technology'],
  },
]

const EASE = [0.16, 1, 0.3, 1]

function ExpCard({ title, meta, date, current, points, stack, index, reduceMotion }) {
  return (
    <motion.div
      className={styles.expCard}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: reduceMotion ? 0 : Math.min(index * 0.08, 0.32) }}
    >
      <span className={styles.dot} />
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardMeta}>{meta}</p>
        </div>
        <span className={styles.cardDate}>
          {date}
          {current && (
            <span className={styles.currentBadge}>
              <span className={styles.pulseDot} />
              Current
            </span>
          )}
        </span>
      </div>
      {points && (
        <ul className={styles.points}>
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {stack && (
        <div className={styles.stack}>
          {stack.map((s) => (
            <span key={s} className={styles.stackItem}>{s}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function Timeline({ items, gapClassName, reduceMotion }) {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.6'],
  })
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={trackRef} className={styles.timeline} data-thread="timeline">
      <div className={styles.trackLine} />
      <motion.div
        data-thread-fill
        className={styles.trackFill}
        style={reduceMotion ? { scaleY: 1 } : { scaleY: fillScale }}
      />
      <div className={gapClassName}>
        {items.map((item, i) => (
          <ExpCard key={item.title} {...item} index={i} reduceMotion={reduceMotion} />
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('work')
  const [pillStyle, setPillStyle] = useState({})
  const tabWorkRef = useRef(null)
  const tabEduRef = useRef(null)
  const containerRef = useRef(null)
  const reduceMotion = useReducedMotion()

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
        <SectionHeader label="Experience" title="Work & Education" />

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
            <Timeline items={WORK} gapClassName={`${styles.spaceY} ${styles.spaceYLarge}`} reduceMotion={reduceMotion} />
          </div>

          <div
            role="tabpanel"
            id="panel-education"
            className={activeTab === 'education' ? styles.tabPanel : `${styles.tabPanel} ${styles.hidden}`}
          >
            <Timeline items={EDUCATION} gapClassName={styles.spaceY} reduceMotion={reduceMotion} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
