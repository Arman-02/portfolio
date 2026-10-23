import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../Reveal/Reveal'
import Magnetic from '../Magnetic/Magnetic'
import headerStyles from '../SectionHeader/SectionHeader.module.css'
import styles from './Contact.module.css'

// Paste the ID from your Formspree form URL (https://formspree.io/f/<ID>).
// While empty, the form falls back to opening the visitor's mail app.
const FORMSPREE_FORM_ID = ''
const EMAIL = 'armanmotiwala02@gmail.com'
const HEADLINE = ["Let's", 'build', 'something', 'intelligent.']
const EASE = [0.16, 1, 0.3, 1]

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData

    if (!FORMSPREE_FORM_ID) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, _subject: subject, message }),
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      setStatus('sent')
      setFormData(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={headerStyles.label}>
            <span className={headerStyles.labelLine} aria-hidden="true" />
            Get in touch
          </span>
          {/* In-view is tracked on the heading: the words start clipped by their masks */}
          <motion.h2
            className={styles.title}
            aria-label={HEADLINE.join(' ')}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {HEADLINE.map((word, i) => (
              <span key={word} className={styles.wordMask} aria-hidden="true">
                <motion.span
                  className={styles.word}
                  variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
                  transition={{ duration: 1, ease: EASE, delay: reduceMotion ? 0 : i * 0.08 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <p className={styles.subtitle}>
            Open to AI/ML engineering roles, research collaborations, or just talking tech.
          </p>

          <div className={styles.links}>
            <Magnetic>
              <button type="button" className={styles.primaryLink} onClick={copyEmail}>
                {copied ? 'Copied to clipboard ✓' : EMAIL}
                {!copied && (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth="1.5" />
                    <path d="M5 15V6a2 2 0 012-2h9" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="https://linkedin.com/in/mohommed-arman-motiwala-594111219"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryLink}
              >
                LinkedIn ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/Arman-02" target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
                GitHub ↗
              </a>
            </Magnetic>
          </div>
        </div>

        <Reveal variant="up" delay={150} className={styles.formCard}>
          {status === 'sent' ? (
            <div className={styles.sent} role="status">
              <span className={styles.sentIcon}>✓</span>
              <h3>Message sent</h3>
              <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
              <button type="button" className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formFields}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input type="text" name="name" className={styles.formInput} value={formData.name} onChange={handleChange} autoComplete="name" required />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input type="email" name="email" className={styles.formInput} value={formData.email} onChange={handleChange} autoComplete="email" required />
                </label>
              </div>
              <label className={styles.field}>
                <span>Subject</span>
                <input type="text" name="subject" className={styles.formInput} value={formData.subject} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>Message</span>
                <textarea name="message" className={`${styles.formInput} ${styles.formInputtextarea}`} rows={5} value={formData.message} onChange={handleChange} required />
              </label>
              {status === 'error' && (
                <p className={styles.error} role="alert">
                  Something went wrong. Please email me directly at {EMAIL}.
                </p>
              )}
              <button type="submit" className={styles.formBtn} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
