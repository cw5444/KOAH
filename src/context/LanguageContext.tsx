'use client'

import React, { createContext, useContext, useState } from 'react'

type LangContextType = {
  lang: string
  setLang: (lang: string) => void
}

const LanguageContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('ko')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

/** 안전하게 Context를 읽는 hook — Provider 밖에서 호출해도 에러를 던지지 않고 null을 반환하지 않도록 사용처에서 검사하세요. */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
