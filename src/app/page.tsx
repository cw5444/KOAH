// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import ExhibitionsSection from '@/components/sections/ExhibitionsSection'
import Contact from '@/components/sections/Contact'
// ... 다른 섹션 import

export default function HomePage() {
  const { lang } = useLanguage()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main>
      <header className="...">
        {/* Header에서 언어 선택하므로 여기선 제거 */}
      </header>

      {/* ...다른 섹션에도 lang 전달 */}
      <ExhibitionsSection lang={lang} />
      <Contact lang={lang} />
    </main>
  )
}
