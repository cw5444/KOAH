'use client'

import React, { createContext, useContext, useState } from 'react'

type Lang = 'ko' | 'en'
type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
