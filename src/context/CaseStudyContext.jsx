import { createContext, useContext, useState, useCallback } from 'react'

const CaseStudyContext = createContext()

export function CaseStudyProvider({ children }) {
  const [openId, setOpenId] = useState(null)

  const openCaseStudy = useCallback((id) => setOpenId(id), [])
  const closeCaseStudy = useCallback(() => setOpenId(null), [])

  return (
    <CaseStudyContext.Provider value={{ openId, openCaseStudy, closeCaseStudy }}>
      {children}
    </CaseStudyContext.Provider>
  )
}

export function useCaseStudy() {
  const ctx = useContext(CaseStudyContext)
  if (!ctx) throw new Error('useCaseStudy must be used within CaseStudyProvider')
  return ctx
}
