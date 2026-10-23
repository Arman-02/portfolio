import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { usePdfModal } from '../../context/PdfModalContext'
import Magnetic from '../Magnetic/Magnetic'
import headerStyles from '../SectionHeader/SectionHeader.module.css'
import styles from './About.module.css'

const FACTS = [
  { label: 'Currently', value: 'AI Engineer, Northeastern AI Strategic Hub' },
  { label: 'Studying', value: 'MS in AI, Northeastern University' },
  { label: 'Published', value: 'IEEE SCEECS 2025' },
  { label: 'Based in', value: 'Boston, MA' },
]

function FadeUp({ children, className, range, scrollYProgress, reduceMotion, as: Component = 'div' }) {
  const opacity = useTransform(scrollYProgress, range, [0, 1])
  const y = useTransform(scrollYProgress, range, [24, 0])
  const MotionComponent = motion[Component]

  return (
    <MotionComponent className={className} style={reduceMotion ? undefined : { opacity, y }}>
      {children}
    </MotionComponent>
  )
}

export default function About() {
  const { openModal } = usePdfModal()
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'start 0.25'],
  })

  // The photo grows in-line between the words, pushing them apart
  const photoWidth = useTransform(scrollYProgress, [0.05, 0.5], ['0em', '1.1em'])
  const photoScale = useTransform(scrollYProgress, [0.05, 0.5], [0.2, 1])
  const photoRotate = useTransform(scrollYProgress, [0.05, 0.5], [-30, 0])

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <span className={headerStyles.label}>
          <span className={headerStyles.labelLine} aria-hidden="true" />
          About
        </span>

        <h2 className={styles.nameHeading}>
          <span>Hi, I&apos;m</span>
          <motion.span
            className={styles.photoInline}
            style={reduceMotion ? { width: '1.1em' } : { width: photoWidth }}
          >
            <motion.img
              src="/myPhoto.jpeg"
              alt="Portrait of Arman Motiwala"
              className={styles.profileImage}
              style={reduceMotion ? undefined : { scale: photoScale, rotate: photoRotate }}
              onError={(e) => (e.target.style.display = 'none')}
            />
          </motion.span>
          <span>Arman</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.paragraphs}>
            <FadeUp as="p" range={[0.35, 0.7]} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion}>
              I have been interested in AI since 2021 when I first decided to choose it as my undergraduate major. It was a difficult choice between AI and Cybersecurity, but I am glad I chose AI because of its diversity and the passion I developed for building and experimenting with models. I have now come to Northeastern to further my expertise. I am always open to connecting with new people in the field and working on exciting new projects.
            </FadeUp>
            <FadeUp as="p" range={[0.5, 0.85]} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion}>
              Apart from my interest in AI, I love playing sports, including soccer, basketball, volleyball, and table tennis, and I like staying fit by going to the gym. In fact, I have represented my schools and clubs in soccer, table tennis, basketball, and track events at the district level in both Mumbai and Dubai.
            </FadeUp>
            <FadeUp range={[0.65, 1]} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion}>
              <Magnetic>
                <button type="button" className={styles.resumeBtn} onClick={openModal}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </button>
              </Magnetic>
            </FadeUp>
          </div>

          <FadeUp as="dl" className={styles.facts} range={[0.45, 0.9]} scrollYProgress={scrollYProgress} reduceMotion={reduceMotion}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
