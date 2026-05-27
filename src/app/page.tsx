'use client'

import { useLanguage } from '@/context/LanguageContext'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Classes from '@/components/sections/Classes'
import Curriculum from '@/components/sections/Curriculum'
import Sports from '@/components/sections/Sports'
import Journey from '@/components/sections/Journey'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  const { lang } = useLanguage()

  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <Classes lang={lang} />
      <Curriculum lang={lang} />
      <Sports lang={lang} />
      <Journey lang={lang} />
      <Contact lang={lang} />
    </>
  )
}
