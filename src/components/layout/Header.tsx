'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const { lang } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const content = {
    ko: { about: '소개', classes: '수업', contact: '문의', band: '산위의 학교 공식밴드' },
    en: { about: 'About', classes: 'Classes', contact: 'Contact', band: 'Official Band' }
  }
  const t = content[lang]

  // 메뉴 열릴 때 body 스크롤 금지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    function handlePointerDown(ev: PointerEvent) {
      if (!isMenuOpen) return
      const target = ev.target as Node | null
      if (!target) return
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }

    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape' && isMenuOpen) setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 h-20 sm:h-28 lg:h-32 flex items-center justify-between gap-2">
    <Link href="/" className="flex items-center flex-shrink-0">
      <div className="relative w-56 sm:w-64 lg:w-96 h-16 sm:h-20 lg:h-24 flex-shrink-0">
        <Image src="/logo_text.png" alt="산위의 학교" fill className="object-contain object-left" priority />
      </div>
    </Link>

    <nav className="hidden lg:flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest items-center ml-auto">
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

    <button
      ref={buttonRef}
      className="lg:hidden p-2 relative z-50 flex-shrink-0"
      onClick={() => setIsMenuOpen((s) => !s)}
      aria-label="menu"
      aria-expanded={isMenuOpen}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
      </svg>
    </button>
  </div>

  {isMenuOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
      onClick={() => setIsMenuOpen(false)}
    />
  )}

  {isMenuOpen && (
    <div
      ref={menuRef}
      className="fixed top-20 sm:top-28 left-0 right-0 bg-white lg:hidden flex flex-col gap-6 font-bold z-50 px-6 py-8 border-t border-gray-100"
    >
      <Link href="#about" onClick={() => setIsMenuOpen(false)}>{t.about}</Link>
      <Link href="#classes" onClick={() => setIsMenuOpen(false)}>{t.classes}</Link>
      <Link href="#contact" onClick={() => setIsMenuOpen(false)}>{t.contact}</Link>
      <hr />
      <a href="https://www.band.us/band/92458697/post" target="_blank" rel="noopener noreferrer" className="text-green-600">
        {t.band} →
      </a>
    </div>
  )}
</header>



  )
}
