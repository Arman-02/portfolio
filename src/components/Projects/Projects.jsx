import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCaseStudy } from '../../context/CaseStudyContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import ProjectCover from './ProjectCover'
import CaseStudy from './CaseStudy'
import { PROJECTS } from './projectData'
import styles from './Projects.module.css'

const EASE = [0.16, 1, 0.3, 1]
const FEATURED = PROJECTS.filter((p) => p.featured)
const MORE = PROJECTS.filter((p) => !p.featured)

function GitHubIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function FeaturedCard({ project, index, onOpen, reduceMotion }) {
  return (
    <motion.div
      className={index === 0 ? styles.cardWrapWide : undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay: reduceMotion ? 0 : (index % 2) * 0.12 }}
    >
      <article data-thread="card" className={`${styles.card} ${index === 0 ? styles.cardWide : ''}`}>
        <div className={styles.cardCover}>
          <ProjectCover project={project} index={index} size={index === 0 ? 'lg' : 'md'} />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardShort}>{project.short}</p>
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <div className={styles.cardActions}>
            <button type="button" className={styles.caseBtn} onClick={() => onOpen(project.id)}>
              <span className={styles.stretched} aria-hidden="true" />
              Read case study
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.ghLink} aria-label={`${project.title} on GitHub`}>
              <GitHubIcon />
            </a>
          </div>
        </div>
      </article>
    </motion.div>
  )
}

export default function Projects() {
  const { openId, openCaseStudy: setOpenId, closeCaseStudy } = useCaseStudy()
  const reduceMotion = useReducedMotion()
  const openIndex = PROJECTS.findIndex((p) => p.id === openId)

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader label="Selected work" title="Projects">
          Research-grade ML, shipped as working systems. Open any project for the full case study.
        </SectionHeader>

        <div className={styles.featured}>
          {FEATURED.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} onOpen={setOpenId} reduceMotion={reduceMotion} />
          ))}
        </div>

        <div className={styles.more}>
          <h3 className={styles.moreTitle}>More projects</h3>
          <ul className={styles.list}>
            {MORE.map((project, i) => (
              <motion.li
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : i * 0.06 }}
              >
                <button type="button" className={styles.row} onClick={() => setOpenId(project.id)}>
                  <span className={styles.rowIndex}>{String(FEATURED.length + i + 1).padStart(2, '0')}</span>
                  <span className={styles.rowMain}>
                    <span className={styles.rowTitle}>{project.title}</span>
                    <span className={styles.rowTags}>{project.tags.join(' · ')}</span>
                  </span>
                  {project.metric && (
                    <span className={styles.rowMetric}>
                      {project.metric.value}
                      <small>{project.metric.label}</small>
                    </span>
                  )}
                  <span className={styles.rowArrow} aria-hidden="true">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {openIndex >= 0 && (
          <CaseStudy
            key="case-study"
            project={PROJECTS[openIndex]}
            index={openIndex}
            next={PROJECTS[(openIndex + 1) % PROJECTS.length]}
            onNext={() => setOpenId(PROJECTS[(openIndex + 1) % PROJECTS.length].id)}
            onClose={closeCaseStudy}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
