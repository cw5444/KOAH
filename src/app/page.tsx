'use client'

import { useLanguage } from '@/context/LanguageContext'
import ExhibitionsSection from '@/components/sections/ExhibitionsSection'
import Contact from '@/components/sections/Contact'
// ... 다른 섹션 import

export default function HomePage() {
  const { lang } = useLanguage()
  
  return (
    <main>
      <ExhibitionsSection lang={lang} />
      <Contact lang={lang} />
      {/* ...다른 섹션들 */}
    </main>
  )
}
