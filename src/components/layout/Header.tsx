// src/components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

interface HeaderProps {
  lang?: string
  setLang?: (lang: string) => void
}

export default function Header({ lang: propLang, setLang: propSetLang }: HeaderProps) {
  const [internalLang, setInternalLang] = useState<'ko' | 'en'>('ko')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Context 사용 시(정상동작 루트) Context 값을 우선 사용.
  // 만약 Header가 Provider 밖에서 테스트용으로 쓰이면 prop 또는 내부 상태를 사용하도록 fallback 유지.
  let ctxLang: 'ko' | 'en' | undefined
  let ctxSetLang: ((l: 'ko' | 'en') => void) | undefined
  try {
    const ctx = useLanguage()
    ctxLang = ctx.lang
    ctxSetLang = ctx.setLang
  } catch {
    // Provider가 없을 경우 useLanguage에서 에러가 발생하므로 무시하고 fallback 사용
  }

  const lang = (propLang as 'ko' | 'en') ?? ctxLang ?? internalLang
  const setLang = (value: string) => {
    const v = value === 'en' ? 'en' : 'ko'
    if (propSetLang) propSetLang(v)
    else if (ctxSetLang) ctxSetLang(v)
    else setInternalLang(v)
  }

  const content = {
    ko: {
      about: '소개',
      classes: '수업',
      contact: '문의',
      band: '산위의 학교 공식밴드'
    },
    en: {
      about: 'About',
      classes: 'Classes',
      contact: 'Contact',
      band: 'Official Band'
    }
  }

  const t = content[lang]

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image src="/logo.png" alt="산위의 학교 로고" fill className="object-contain" priority />
          </div>
          <div className="h-12 w-[1px] bg-gray-200" />
          <div className="relative w-48 h-16 flex-shrink-0">
            <Image src="/logo_text.png" alt="산위의 학교" fill className="object-contain object-left" priority />
          </div>
        </Link>

        <nav className="hidden lg:flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest items-center">
          <Link href="#about" className="hover:text-black transition-colors">{t.about}</Link>
          <Link href="#classes" className="hover:text-black transition-colors">{t.classes}</Link>
          <Link href="#contact" className="hover:text-black transition-colors">{t.contact}</Link>

          <a
            href="https://www.band.us/band/92458697/post"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            {t.band}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <select
              className="appearance-none font-bold text-xs bg-gray-50 border border-gray-100 rounded-full px-5 py-2 cursor-pointer focus:outline-none hover:bg-gray-100 transition-colors"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="ko">KOREAN</option>
              <option value="en">ENGLISH</option>
            </select>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* overlay: 페이지 본문을 덮어 터치/클릭을 잡아서 메뉴 닫기 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* 메뉴 패널은 overlay보다 위에 있어야 하므로 z-50 유지 */}
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-8 flex flex-col gap-6 font-bold z-50">
            <Link href="#about" onClick={() => setIsMenuOpen(false)}>{t.about}</Link>
            <Link href="#classes" onClick={() => setIsMenuOpen(false)}>{t.classes}</Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)}>{t.contact}</Link>
            <hr />
            <a href="https://www.band.us/band/92458697/post" target="_blank" rel="noopener noreferrer" className="text-green-600">
              {t.band} →
            </a>
          </div>
        </>
      )}
    </header>
  )
}
