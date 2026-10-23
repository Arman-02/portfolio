import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { lockScroll } from '../../lib/smoothScroll'
import Magnetic from '../Magnetic/Magnetic'
import ProjectCover from './ProjectCover'
import BeforeAfter from './BeforeAfter'
import styles from './CaseStudy.module.css'

const EASE = [0.76, 0, 0.24, 1]

export default function CaseStudy({ project, index, next, onNext, onClose }) {
  const reduceMotion = useReducedMotion()
  const closeRef = useRef(null)
  const scrollRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const { case: cs } = project

  useEffect(() => {
    const previouslyFocused = document.activeElement
    lockScroll(true)
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [])

  // Jump back to the top when moving to the next project
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [project.id])

  const duration = reduceMotion ? 0 : 0.8

  return createPortal(
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: duration * 0.6, delay: duration * 0.3 } }}
      transition={{ duration: duration * 0.5 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <motion.div
        className={styles.panel}
        initial={{ clipPath: 'inset(100% 0 0 0 round 28px)' }}
        animate={{ clipPath: 'inset(0% 0 0 0 round 28px)' }}
        exit={{ clipPath: 'inset(100% 0 0 0 round 28px)' }}
        transition={{ duration, ease: EASE }}
      >
        <Magnetic className={styles.closeWrap} strength={0.4}>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close case study">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="1.75" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </Magnetic>

        <div ref={scrollRef} className={styles.scroll} data-lenis-prevent>
          <motion.div
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.35 }}
          >
            <div className={styles.cover}>
              <ProjectCover project={project} index={index} size="lg" />
            </div>

            <div className={styles.body}>
              <header className={styles.header}>
                <span className={styles.eyebrow}>Case study · {String(index + 1).padStart(2, '0')}</span>
                <h2 id="case-study-title" className={styles.title}>{project.title}</h2>
                <p className={styles.short}>{project.short}</p>
                <div className={styles.tags}>
                  {project.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </header>

              <section className={styles.block}>
                <h3 className={styles.blockLabel}>The question</h3>
                <p className={styles.question}>{cs.question}</p>
              </section>

              <section className={styles.block}>
                <h3 className={styles.blockLabel}>Approach</h3>
                <ol className={styles.steps}>
                  {cs.approach.map((step, i) => (
                    <li key={step}>
                      <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {cs.results && (
                <section className={styles.block}>
                  <h3 className={styles.blockLabel}>Results</h3>
                  <div className={styles.results}>
                    {cs.results.map((r) => (
                      <div key={r.label} className={styles.result}>
                        <span className={styles.resultValue}>{r.value}</span>
                        <span className={styles.resultLabel}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {project.compare && <BeforeAfter {...project.compare} />}

              {project.image && (
                <figure className={styles.figure}>
                  <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                </figure>
              )}

              <div className={styles.footer}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.ghBtn}>
                  View on GitHub
                </a>
                <button type="button" className={styles.next} onClick={onNext}>
                  <span className={styles.nextLabel}>Next project</span>
                  <span className={styles.nextTitle}>{next.title} →</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
