import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  siPython,
  siTypescript,
  siJavascript,
  siOpenjdk,
  siPytorch,
  siTensorflow,
  siScikitlearn,
  siHuggingface,
  siLangchain,
  siLanggraph,
  siOllama,
  siOpencv,
  siFastapi,
  siFlask,
  siNodedotjs,
  siReact,
  siNextdotjs,
  siPostgresql,
  siMongodb,
  siMilvus,
  siApachespark,
  siGooglecloud,
  siDocker,
  siKubernetes,
  siGithubactions,
  siGit,
  siStreamlit,
} from 'simple-icons'
import SectionHeader from '../SectionHeader/SectionHeader'
import SkillGlobe from './SkillGlobe'
import styles from './Skills.module.css'

// [name, icon, short]: icon null renders a neutral dot in the list and `short` on the globe
const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: [
      ['Python', siPython],
      ['TypeScript', siTypescript],
      ['JavaScript', siJavascript],
      ['SQL', null, 'SQL'],
      ['Java', siOpenjdk],
    ],
  },
  {
    title: 'ML & GenAI',
    skills: [
      ['PyTorch', siPytorch],
      ['TensorFlow', siTensorflow],
      ['scikit-learn', siScikitlearn],
      ['Hugging Face', siHuggingface],
      ['LangChain', siLangchain],
      ['LangGraph', siLanggraph],
      ['LlamaIndex', null, 'LlamaIndex'],
      ['Ollama', siOllama],
      ['vLLM', null, 'vLLM'],
      ['LoRA Fine-tuning', null, 'LoRA'],
      ['RAG', null, 'RAG'],
      ['Reinforcement Learning', null, 'RL'],
      ['Computer Vision', siOpencv],
    ],
  },
  {
    title: 'Engineering',
    skills: [
      ['FastAPI', siFastapi],
      ['Flask', siFlask],
      ['Node.js', siNodedotjs],
      ['React', siReact],
      ['Next.js', siNextdotjs],
      ['PostgreSQL', siPostgresql],
      ['MongoDB', siMongodb],
      ['Qdrant', null, 'Qdrant'],
      ['Milvus', siMilvus],
      ['PySpark', siApachespark],
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      ['GCP / Vertex AI', siGooglecloud],
      ['AWS', null, 'AWS'],
      ['Docker', siDocker],
      ['Kubernetes', siKubernetes],
      ['GitHub Actions', siGithubactions],
      ['Git', siGit],
      ['Streamlit', siStreamlit],
    ],
  },
]

const GLOBE_SKILLS = SKILL_CATEGORIES.flatMap((cat) =>
  cat.skills.map(([name, icon, short]) => ({ name, icon, short }))
)

const EASE = [0.16, 1, 0.3, 1]

function SkillChip({ name, icon, delay, reduceMotion, onHover }) {
  return (
    <motion.li
      className={styles.chip}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay: reduceMotion ? 0 : delay }}
    >
      {icon ? (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d={icon.path} fill="currentColor" />
        </svg>
      ) : (
        <span className={styles.dot} aria-hidden="true" />
      )}
      {name}
    </motion.li>
  )
}

export default function Skills() {
  const reduceMotion = useReducedMotion()
  const [activeSkill, setActiveSkill] = useState(null)

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <SectionHeader label="Toolkit" title="Skills">
              What I reach for when taking a model from notebook to production.
            </SectionHeader>
            <p className={styles.hint}>
              <span className={styles.hintDot} aria-hidden="true" />
              Drag the globe, or hover a skill below to find it.
            </p>
          </div>
          <SkillGlobe skills={GLOBE_SKILLS} activeName={activeSkill} />
        </div>

        <div className={styles.groups}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{cat.title}</h3>
              <ul className={styles.chips}>
                {cat.skills.map(([name, icon], i) => (
                  <SkillChip
                    key={name}
                    name={name}
                    icon={icon}
                    delay={Math.min(i * 0.03, 0.3)}
                    reduceMotion={reduceMotion}
                    onHover={setActiveSkill}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
