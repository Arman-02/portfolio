import { useState } from 'react'
import Reveal from '../Reveal/Reveal'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const mailto = `mailto:armanmotiwala02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    window.location.href = mailto
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="up" className={styles.header}>
          <span className={styles.label}>Get in touch</span>
          <h2 className={styles.title}>
            Let's build<br />something intelligent
          </h2>
          <p className={styles.subtitle}>
            Open to collaborating on AI/ML projects, research opportunities, or just talking tech.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={150} className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.formFields}>
            <input
              type="text"
              name="name"
              className={styles.formInput}
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              className={styles.formInput}
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              className={`${styles.formInput} ${styles.formInputtextarea}`}
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.formBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </button>
          </form>
        </Reveal>

        <Reveal variant="up" delay={220} className={styles.links}>
          <a href="mailto:armanmotiwala02@gmail.com" className={styles.primaryLink}>
            armanmotiwala02@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/mohommed-arman-motiwala-594111219"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryLink}
          >
            LinkedIn →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
