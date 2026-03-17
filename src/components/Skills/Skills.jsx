import Reveal from '../Reveal/Reveal'
import styles from './Skills.module.css'
import {
  siPython,
  siJavascript,
  siTypescript,
  siHtml5,
  siTailwindcss,
  siPytorch,
  siTensorflow,
  siLangchain,
  siHuggingface,
  siMistralai,
  siOllama,
  siNodedotjs,
  siFastapi,
  siFlask,
  siMongodb,
  siMilvus,
  siGooglecloud,
  siDocker,
  siGit,
  siStreamlit,
  siOpencv,
} from 'simple-icons'

const SKILL_CATEGORIES = [
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'Python', iconBg: 'rgba(55, 118, 171, 0.15)' },
      { name: 'JavaScript', iconBg: 'rgba(247, 223, 30, 0.15)' },
      { name: 'TypeScript', iconBg: 'rgba(49, 120, 198, 0.15)' },
      { name: 'SQL', iconBg: 'rgba(0, 188, 212, 0.15)' },
      { name: 'HTML', iconBg: 'rgba(227, 79, 38, 0.15)' },
      { name: 'CSS', iconBg: 'rgba(38, 77, 228, 0.15)' },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'PyTorch', iconBg: 'rgba(238, 76, 44, 0.15)' },
      { name: 'TensorFlow', iconBg: 'rgba(255, 111, 0, 0.15)' },
      { name: 'LangChain', iconBg: 'rgba(30, 136, 229, 0.15)' },
      { name: 'Hugging Face', iconBg: 'rgba(255, 213, 79, 0.15)' },
      { name: 'Mistral', iconBg: 'rgba(255, 87, 34, 0.15)' },
      { name: 'Ollama', iconBg: 'rgba(158, 158, 158, 0.15)' },
      { name: 'LLM Fine-tuning', iconBg: 'rgba(103, 58, 183, 0.15)' },
      { name: 'RAG Systems', iconBg: 'rgba(76, 175, 80, 0.15)' },
    ],
  },
  {
    title: 'BACKEND',
    skills: [
      { name: 'Node.js', iconBg: 'rgba(104, 159, 99, 0.15)' },
      { name: 'FastAPI', iconBg: 'rgba(0, 150, 136, 0.15)' },
      { name: 'Flask', iconBg: 'rgba(0, 188, 212, 0.15)' },
      { name: 'MongoDB', iconBg: 'rgba(76, 175, 80, 0.15)' },
      { name: 'Qdrant', iconBg: 'rgba(220, 38, 127, 0.15)' },
      { name: 'Milvus', iconBg: 'rgba(0, 188, 212, 0.15)' },
    ],
  },
  {
    title: 'TOOLS & CLOUD',
    skills: [
      { name: 'GCP', iconBg: 'rgba(66, 133, 244, 0.15)' },
      { name: 'Vertex AI', iconBg: 'rgba(255, 152, 0, 0.15)' },
      { name: 'OpenAI API', iconBg: 'rgba(244, 67, 54, 0.15)' },
      { name: 'Docker', iconBg: 'rgba(33, 150, 243, 0.15)' },
      { name: 'Git', iconBg: 'rgba(240, 98, 146, 0.15)' },
      { name: 'Streamlit', iconBg: 'rgba(255, 235, 59, 0.15)' },
      { name: 'OpenCV', iconBg: 'rgba(156, 39, 176, 0.15)' },
    ],
  },
]

function SkillLogo({ name }) {
  const Brand = ({ icon, color, bg = 'transparent' }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ color: color ? `#${color}` : undefined, background: bg }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )

  switch (name) {
    case 'Python':
      return <Brand icon={siPython} color={siPython.hex} />
    case 'JavaScript':
      return <Brand icon={siJavascript} color={siJavascript.hex} />
    case 'TypeScript':
      return <Brand icon={siTypescript} color={siTypescript.hex} />
    case 'SQL':
      // No single "SQL" brand — keep a clean database icon
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#0EA5E9' }}>
          <ellipse cx="12" cy="5" rx="6.5" ry="2.7" fill="currentColor" opacity="0.95" />
          <path
            d="M5.5 5.2v9.4C5.5 16.7 8.4 18 12 18s6.5-1.3 6.5-3.4V5.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M5.5 9.5C5.5 11.6 8.4 13 12 13s6.5-1.4 6.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.7"
          />
        </svg>
      )
    case 'HTML':
      return <Brand icon={siHtml5} color={siHtml5.hex} />
    case 'CSS':
      // Simple Icons doesn’t ship CSS3 in this version; keep a clean CSS shield.
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#2965F1' }}>
          <path fill="currentColor" d="M4 3h16l-1.5 17-6.5 2-6.5-2z" opacity="0.95" />
          <path fill="#fff" opacity="0.95" d="M12 8.8h4.2l.2-2.1H12V4.9h6.9l-.6 6.2H12z" />
          <path fill="#fff" opacity="0.95" d="M12 19.5l4.5-1.4.4-4.2H15l-.2 2.2-2.8.8z" />
        </svg>
      )
    case 'PyTorch':
      return <Brand icon={siPytorch} color={siPytorch.hex} />
    case 'TensorFlow':
      return <Brand icon={siTensorflow} color={siTensorflow.hex} />
    case 'LangChain':
      return <Brand icon={siLangchain} color={siLangchain.hex} />
    case 'Hugging Face':
      return <Brand icon={siHuggingface} color={siHuggingface.hex} />
    case 'Mistral':
      return <Brand icon={siMistralai} color={siMistralai.hex} />
    case 'Ollama':
      return <Brand icon={siOllama} color={siOllama.hex} />
    case 'Node.js':
      return <Brand icon={siNodedotjs} color={siNodedotjs.hex} />
    case 'FastAPI':
      return <Brand icon={siFastapi} color={siFastapi.hex} />
    case 'Flask':
      return <Brand icon={siFlask} color={siFlask.hex} />
    case 'MongoDB':
      return <Brand icon={siMongodb} color={siMongodb.hex} />
    case 'Milvus':
      return <Brand icon={siMilvus} color={siMilvus.hex} />
    case 'Qdrant':
      // Not in Simple Icons here — keep a crisp “Q” mark.
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#E11D48' }}>
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15.5 15.5l2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'GCP':
      return <Brand icon={siGooglecloud} color={siGooglecloud.hex} />
    case 'Vertex AI':
      // Closest official brand mark available here is Google Cloud.
      return <Brand icon={siGooglecloud} color={siGooglecloud.hex} />
    case 'OpenAI API':
      // Simple Icons doesn’t include OpenAI in this package version; use a clean knot mark.
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: '#111827' }}>
          <path
            d="M12 4.4c2.3-1.3 5.2-.5 6.5 1.8.8 1.5.8 3.2-.1 4.6.9 1.4 1 3.2.1 4.6-1.3 2.3-4.2 3.1-6.5 1.8-.6.4-1.4.6-2.1.6-2.7 0-4.8-2.2-4.8-4.8 0-.7.2-1.5.6-2.1-.4-.6-.6-1.4-.6-2.1 0-2.7 2.2-4.8 4.8-4.8.7 0 1.5.2 2.1.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'Docker':
      return <Brand icon={siDocker} color={siDocker.hex} />
    case 'Git':
      return <Brand icon={siGit} color={siGit.hex} />
    case 'Streamlit':
      return <Brand icon={siStreamlit} color={siStreamlit.hex} />
    case 'OpenCV':
      return <Brand icon={siOpencv} color={siOpencv.hex} />
    default:
      return <span className={styles.skillIconDot} />
  }
}

function SkillItem({ name, iconBg }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillIcon} style={{ background: iconBg }}>
        <SkillLogo name={name} />
      </div>
      <span>{name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="up" className={styles.header}>
          <h2 className={styles.title}>My Skills</h2>
          <p className={styles.subtitle}>A quick snapshot of what I build with.</p>
        </Reveal>

        <div className={styles.categoryGrid}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} variant="up" delay={80 + i * 60} className={styles.categoryCard}>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <div className={styles.skillGrid}>
                {cat.skills.map((skill) => (
                  <SkillItem key={skill.name} name={skill.name} iconBg={skill.iconBg} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
