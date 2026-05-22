'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('en')

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO 영역 */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="KOAH Logo" width={50} height={50} />
          <div className="flex flex-col">
            <span className="text-lg font-black leading-tight">산위의 학교</span>
            <span className="text-[10px] tracking-[0.2em] font-medium text-gray-500">KOH SCHOOL</span>
          </div>
        </Link>

        {/* 대시보드/메뉴 (필요 시 활성화) */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-koahYellow transition-colors">About</Link>
          <Link href="/classes" className="hover:text-koahYellow transition-colors">Classes</Link>
        </nav>

        {/* 언어 선택기 */}
        <div className="flex items-center gap-4">
          <select
            className="rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-koahYellow"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language switcher"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
    </header>
  )
}
