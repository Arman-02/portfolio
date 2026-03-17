import { usePdfModal } from '../../context/PdfModalContext'
import Reveal from '../Reveal/Reveal'
import styles from './About.module.css'

export default function About() {
  const { openModal } = usePdfModal()

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="right" className={styles.left}>
          <img
            src="/myPhoto.jpeg"
            alt="Arman Motiwala"
            className={styles.profileImage}
            onError={(e) => (e.target.style.display = 'none')}
          />
          <button type="button" className={styles.resumeBtn} onClick={openModal}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Resume
          </button>
        </Reveal>
        <Reveal variant="left" delay={150}>
          <span className={styles.label}>About</span>
          <h2 className={styles.title}>
            Engineer with a<br />
            <span className={styles.titleMuted}>researcher's mind</span>
          </h2>
          <div className={styles.paragraphs}>
            <p>
              I'm pursuing my Master's in Artificial Intelligence at Northeastern University, combining rigorous research with practical engineering. Based in Boston, I build intelligent systems that bridge the gap between academic innovation and real-world impact.
            </p>
            <p>
              My work spans deep learning, NLP, and computer vision. I've shipped multi-image analysis systems, built RAG-based platforms, and published in IEEE conferences. Every project gets the same treatment: research-grade thinking, production-grade code.
            </p>
            <p>
              Off the clock—basketball, soccer, gym. Always learning, always building.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
