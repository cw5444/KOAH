'use client'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Classes from '@/components/sections/Classes'
import Curriculum from '@/components/sections/Curriculum'
import Sports from '@/components/sections/Sports'
import Journey from '@/components/sections/Journey'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      {/* Header는 layout -> RootWrapper에서 렌더됩니다 */}
      <Hero />
      <About />
      <Classes />
      <Curriculum />
      <Sports />
      <Journey />
      <Contact />
    </>
  )
}
