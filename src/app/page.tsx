'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Classes from '@/components/sections/Classes'
import Curriculum from '@/components/sections/Curriculum'
import Sports from '@/components/sections/Sports'
import Journey from '@/components/sections/Journey'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  const [lang, setLang] = useState('ko') // 전역 언어 상태

  return (
    <>
      {/* Header에 lang과 setLang을 넘겨줍니다 */}
      <Header lang={lang} setLang={setLang} /> 
      
      {/* 각 섹션에 현재 lang을 전달합니다 (나중에 섹션별로 적용) */}
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
