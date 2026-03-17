import { useEffect, useState } from 'react'
import Reveal from '../Reveal/Reveal'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 0,
    index: '01 / 07',
    title: 'Medical Image Analysis',
    desc: 'Dual deep learning system for medical X-ray analysis. Bone fracture detection using U-Net++ with EfficientNet-B4 encoder achieving 61.48% Dice score and 93.14% classification accuracy. Chest X-ray classifier (COVID-19, Pneumonia, TB, Normal) using EfficientNet-B3 with 84.92% accuracy and 0.84 macro-F1 score. Custom Dice-Focal-BCE loss function for extreme class imbalance.',
    tags: ['U-Net++', 'EfficientNet', 'PyTorch', 'Computer Vision'],
    link: 'https://github.com/Arman-02/Final-FAI-Project-Updated',
    media: '/MedicalImageAnalysis.png',
    emoji: '🏥',
    gradient: styles.gradientEmerald,
  },
  {
    id: 1,
    index: '02 / 07',
    title: 'Auto Assess',
    desc: 'SQL query generation from natural language using fine-tuned Llama 3.1. Achieved 87% execution accuracy on WikiSQL with automated question generation, flashcards, and answer generation.',
    tags: ['Python', 'NLP', 'LLMs', 'PyTorch'],
    link: 'https://github.com/Arman-02',
    media: '/AutoAssessImage.png',
    emoji: '🤖',
    gradient: styles.gradientRed,
  },
  {
    id: 2,
    index: '03 / 07',
    title: 'Image Super Resolution',
    desc: 'WGAN-GP for upscaling low-resolution images with enhanced detail fidelity. VGG19 perceptual loss, achieving PSNR 21.1 and SSIM 0.74 with residual blocks.',
    tags: ['Deep Learning', 'GANs', 'TensorFlow', 'CV'],
    link: 'https://github.com/Arman-02',
    media: '/ImageResolution.png',
    emoji: '🖼️',
    gradient: styles.gradientPurple,
  },
  {
    id: 3,
    index: '04 / 07',
    title: 'Sarcasm Detection',
    desc: 'Developed and compared two deep learning NLP models (CNN vs Sequential NN) with hyperparameter tuning. The Sequential model performed best with an accuracy of 80.1%.',
    tags: ['NLP', 'Deep Learning', 'PyTorch', 'Model Tuning'],
    link: 'https://github.com/Arman-02',
    media: '/SarcasmDetection.png',
    emoji: '🧠',
    gradient: styles.gradientIndigo,
  },
  {
    id: 4,
    index: '05 / 07',
    title: 'SkAI: Flight Safety & Automation',
    desc: 'Modeled a weather safety system using JFK data with Neural Networks and LSTM, and built a Random Forest to predict service urgency. Deployed a Streamlit demo that simulates dynamic rerouting under random conditions.',
    tags: ['Time Series', 'LSTM', 'Random Forest', 'Streamlit'],
    link: 'https://github.com/Arman-02',
    media: '/SKAI_FlightAutomation.png',
    emoji: '✈️',
    gradient: styles.gradientSky,
  },
  {
    id: 5,
    index: '06 / 07',
    title: 'Inventory Automation with Fetch AI Agents',
    desc: 'Built Fetch AI microagents to automate inventory processes and trained LSTMs for pre-emptive stocking (93% accuracy). Implemented multiple agents to simulate stock checks, order placement, prediction, and financial management.',
    tags: ['Agents', 'LSTM', 'Automation', 'Simulation'],
    link: 'https://github.com/Arman-02',
    media: '/FetchAI.png',
    emoji: '🤖',
    gradient: styles.gradientEmerald,
  },
  {
    id: 6,
    index: '07 / 07',
    title: 'AI-Driven Sales Forecasting',
    desc: 'AI-powered forecasting using ARIMA and Auto ARIMA, with stationarity checks and seasonal decomposition to model trend and seasonality accurately.',
    tags: ['Time Series', 'ML', 'pandas', 'numpy'],
    link: 'https://github.com/Arman-02',
    media: '/SalesForecasting.png',
    emoji: '📈',
    gradient: styles.gradientAmber,
  },
]

function ProjectSlide({ project, isActive }) {
  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`} data-project={project.id}>
      <div className={styles.grid}>
        <div className={`${styles.slideImageWrap} ${project.gradient}`}>
          {project.media ? (
            <img
              src={project.media}
              alt={project.title}
              className={styles.slideImage}
              onError={(e) => {
                e.target.style.display = 'none'
                const fallback = e.target.parentElement.querySelector('.fallback')
                if (fallback) fallback.hidden = false
              }}
            />
          ) : null}
          <span className="fallback" hidden={!!project.media} style={{ fontSize: '3.75rem' }}>{project.emoji}</span>
        </div>
        <div className={styles.slideBody}>
          <span className={styles.slideIndex}>{project.index}</span>
          <h3 className={styles.slideTitle}>{project.title}</h3>
          <p className={styles.slideDesc}>{project.desc}</p>
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <span className={styles.linkWrap}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              View on GitHub
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const total = PROJECTS.length

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % total)
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="up" className={styles.header}>
          <span className={styles.label}>Portfolio</span>
          <h2 className={styles.title}>Projects</h2>
        </Reveal>

        <Reveal variant="scale" delay={120} className={styles.window}>
          <div className={styles.windowHeader}>
            <div className={styles.indicators}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.indicator} ${i === current ? styles.active : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
            <div className={styles.navBtns}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => setCurrent((c) => (c - 1 + total) % total)}
                aria-label="Previous project"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => setCurrent((c) => (c + 1) % total)}
                aria-label="Next project"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.slideContent}>
            {PROJECTS.map((proj) => (
              <ProjectSlide key={proj.id} project={proj} isActive={proj.id === current} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
