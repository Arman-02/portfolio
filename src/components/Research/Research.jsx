import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useCaseStudy } from '../../context/CaseStudyContext'
import { scrollToTarget } from '../../lib/smoothScroll'
import SectionHeader from '../SectionHeader/SectionHeader'
import Magnetic from '../Magnetic/Magnetic'
import styles from './Research.module.css'

// Paste the IEEE Xplore / DOI link here to show the "Read paper" button
const PAPER_URL = ''

const PAPER = {
  title: 'Auto-Assess: Automated Code Evaluation Platform for Enhanced SQL Learning',
  authors: ['M. A. Motiwala', 'A. Joshi', 'R. Chapaneri'],
  me: 'M. A. Motiwala',
  venue: "2025 IEEE International Students' Conference on Electrical, Electronics and Computer Science (SCEECS)",
  summary:
    'An automated evaluation platform for SQL learning. A Llama 3.1 model fine-tuned with LoRA on Spider turns natural-language questions into SQL, and an evaluation pipeline checks each query for execution accuracy and logical-form correctness. The platform adds automated question generation, flashcards, and answer generation on top.',
  stats: [
    { value: '87%', label: 'execution accuracy on WikiSQL' },
    { value: '8,000+', label: 'queries in the evaluation pipeline' },
    { value: 'LoRA', label: 'fine-tuned Llama 3.1 on Spider' },
  ],
}

const BIBTEX = `@inproceedings{motiwala2025autoassess,
  title     = {Auto-Assess: Automated Code Evaluation Platform for Enhanced SQL Learning},
  author    = {Motiwala, M. A. and Joshi, A. and Chapaneri, R.},
  booktitle = {2025 IEEE International Students' Conference on Electrical, Electronics and Computer Science (SCEECS)},
  year      = {2025},
  publisher = {IEEE}
}`

// caseId opens a project case study; href scrolls to a section
const THEMES = [
  {
    title: 'LLMs for learning',
    desc: 'Language models that generate, evaluate, and tutor.',
    works: [
      { label: 'Auto-Assess (IEEE paper)', caseId: 'auto-assess' },
      { label: 'AI-TA platform', href: '#experience' },
    ],
  },
  {
    title: 'Learning from human feedback',
    desc: 'Turning human judgement into a training signal.',
    works: [
      { label: 'Preference-based RL', caseId: 'hitl-rl' },
      { label: 'MatchIQ record matching', href: '#experience' },
    ],
  },
  {
    title: 'Retrieval & agents',
    desc: 'Grounding models in documents and letting them act.',
    works: [
      { label: 'RAG adaptive quiz system', href: '#experience' },
      { label: 'Fetch AI inventory agents', caseId: 'fetch-agents' },
    ],
  },
  {
    title: 'Medical imaging',
    desc: 'Segmentation and classification under extreme class imbalance.',
    works: [{ label: 'Medical Image Analysis', caseId: 'medical-imaging' }],
  },
]

const COMPETITIONS = [
  { year: '2024', name: 'Datathon 2.0', result: 'Finalist' },
  { year: '2024', name: 'Cyber Cypher 3.0', meta: 'Advanced Level', result: 'Finalist' },
  { year: '2024', name: 'Tata Imagination Challenge', meta: 'Student Track · Unstop', result: 'Participant' },
]

const CERTIFICATIONS = [
  { year: '2026', name: 'Claude Code in Action', issuer: 'Anthropic' },
  { year: '2025', name: 'Fundamentals of AI Agents Using RAG and LangChain', issuer: 'IBM · Coursera', verify: 'https://coursera.org/verify/AIEM4HZGQDX2' },
  { year: '2025', name: 'Multimodal RAG using the Vertex AI Gemini API', issuer: 'Google Cloud · Coursera', verify: 'https://coursera.org/verify/D0SWJZN8SXID' },
  { year: '2025', name: 'Introduction to Vertex AI Studio', issuer: 'Google Cloud · Coursera', verify: 'https://coursera.org/verify/DN7KAQU2UPHM' },
  { year: '2024', name: 'Queries with OpenAI: Translate Natural Text to SQL', issuer: 'Coursera Project Network', verify: 'https://coursera.org/verify/EN6PILO408ZF' },
  { year: '2024', name: 'Machine Learning with Python', issuer: 'IBM · Coursera', verify: 'https://coursera.org/verify/HY26WQJ4JQGN' },
]

const EASE = [0.16, 1, 0.3, 1]

function FadeIn({ children, className, delay = 0, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </Component>
  )
}

function Paper() {
  const { openCaseStudy } = useCaseStudy()
  const [copied, setCopied] = useState(false)

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <FadeIn as="article" className={styles.paper}>
      <div className={styles.paperMain}>
        <div className={styles.paperMeta}>
          <span className={styles.paperNum}>01</span>
          <span className={styles.badgeRed}>IEEE SCEECS 2025</span>
          <span className={styles.badgeMuted}>Published</span>
        </div>
        <h3 className={styles.paperTitle}>
          <span data-thread="underline">{PAPER.title}</span>
        </h3>
        <p className={styles.paperAuthors}>
          {PAPER.authors.map((a, i) => (
            <span key={a}>
              {a === PAPER.me ? <strong>{a}</strong> : a}
              {i < PAPER.authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        <p className={styles.paperVenue}>{PAPER.venue}</p>
        <p className={styles.paperSummary}>{PAPER.summary}</p>

        <div className={styles.paperActions}>
          {PAPER_URL && (
            <Magnetic>
              <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                Read paper ↗
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <button type="button" className={styles.btnSecondary} onClick={copyCitation}>
              {copied ? 'BibTeX copied ✓' : 'Copy BibTeX'}
            </button>
          </Magnetic>
          <Magnetic>
            <button type="button" className={styles.btnGhost} onClick={() => openCaseStudy('auto-assess')}>
              Case study →
            </button>
          </Magnetic>
        </div>
      </div>

      <dl className={styles.paperStats}>
        {PAPER.stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </FadeIn>
  )
}

function Themes() {
  const { openCaseStudy } = useCaseStudy()

  const go = (work) => {
    if (work.caseId) openCaseStudy(work.caseId)
    else scrollToTarget(work.href)
  }

  return (
    <div className={styles.block}>
      <h3 className={styles.blockTitle}>Research themes</h3>
      <div className={styles.themes}>
        {THEMES.map((t, i) => (
          <FadeIn key={t.title} className={styles.theme} delay={i * 0.08}>
            <span className={styles.themeIndex}>{String(i + 1).padStart(2, '0')}</span>
            <h4 className={styles.themeTitle}>{t.title}</h4>
            <p className={styles.themeDesc}>{t.desc}</p>
            <ul className={styles.themeWorks}>
              {t.works.map((w) => (
                <li key={w.label}>
                  <button type="button" className={styles.themeWork} onClick={() => go(w)}>
                    <span>{w.label}</span>
                    <span aria-hidden="true">{w.caseId ? '→' : '↓'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

function Recognition() {
  return (
    <div className={styles.block}>
      <h3 className={styles.blockTitle}>Recognition</h3>
      <div className={styles.ledgers}>
        <FadeIn className={styles.ledger}>
          <h4 className={styles.ledgerTitle}>Competitions</h4>
          <ul className={styles.rows}>
            {COMPETITIONS.map((c) => (
              <li key={c.name} className={styles.row}>
                <span className={styles.rowYear}>{c.year}</span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>{c.name}</span>
                  {c.meta && <span className={styles.rowMeta}>{c.meta}</span>}
                </span>
                <span className={c.result === 'Finalist' ? styles.resultStrong : styles.resultMuted}>{c.result}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className={styles.ledger} delay={0.1}>
          <h4 className={styles.ledgerTitle}>Certifications</h4>
          <ul className={styles.rows}>
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className={styles.row}>
                <span className={styles.rowYear}>{c.year}</span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>{c.name}</span>
                  <span className={styles.rowMeta}>{c.issuer}</span>
                </span>
                {c.verify ? (
                  <a href={c.verify} target="_blank" rel="noopener noreferrer" className={styles.verify} aria-label={`Verify ${c.name}`}>
                    Verify ↗
                  </a>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </div>
  )
}

export default function Research() {
  return (
    <section id="research" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader label="Research" title="Research & Recognition" />
        <Paper />
        <Themes />
        <Recognition />
      </div>
    </section>
  )
}
