import { createContext, useContext, useState, useCallback } from 'react'

const PdfModalContext = createContext()

export function PdfModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <PdfModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </PdfModalContext.Provider>
  )
}

export function usePdfModal() {
  const ctx = useContext(PdfModalContext)
  if (!ctx) throw new Error('usePdfModal must be used within PdfModalProvider')
  return ctx
}
