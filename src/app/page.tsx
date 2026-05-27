// app/page.tsx (간단 예시)
'use client'

import { useEffect, useState } from 'react'
import ExhibitionsSection from '@/components/sections/ExhibitionsSection'
import Contact from '@/components/sections/Contact'
// ... 다른 섹션 import

export default function HomePage() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko')

  useEffect(() => {
    const saved = localStorage.getItem('site_lang') as 'ko' | 'en' | null
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('site_lang', lang)
  }, [lang])

  return (
    <main>
      <header className="...">
        {/* 간단한 언어 토글 */}
        <button
          onClick={() => setLang((s) => (s === 'ko' ? 'en' : 'ko'))}
          className="px-3 py-1 border rounded"
        >
          {lang === 'ko' ? 'EN' : 'KR'}
        </button>
      </header>

      {/* ...다른 섹션에도 lang 전달 */}
      <ExhibitionsSection lang={lang} />
      <Contact lang={lang} />
    </main>
  )
}
