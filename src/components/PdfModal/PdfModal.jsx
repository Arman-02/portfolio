import { useEffect } from 'react'
import { usePdfModal } from '../../context/PdfModalContext'
import { lockScroll } from '../../lib/smoothScroll'
import styles from './PdfModal.module.css'

const PDF_URL = '/Resume_Arman.pdf'

export default function PdfModal() {
  const { open, closeModal } = usePdfModal()

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  const handleBackdropClick = (e) => e.target === e.currentTarget && closeModal()

  if (!open) return null

  return (
    <div
      className={`${styles.modal} ${styles.active}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF"
    >
      <div className={styles.content} data-lenis-prevent>
        <button type="button" className={styles.close} onClick={closeModal} aria-label="Close">
          ✕
        </button>
        <iframe
          title="Resume PDF"
          className={styles.iframe}
          src={PDF_URL}
        />
      </div>
    </div>
  )
}
