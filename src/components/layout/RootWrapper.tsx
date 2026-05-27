'use client'

import { useState } from 'react'
import Header from './Header'

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('ko')

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      {children}
    </>
  )
}
