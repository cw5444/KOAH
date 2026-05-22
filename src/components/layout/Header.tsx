'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('ko') // 기본 언어 한국어 권장

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO 영역: 그림 왼쪽으로 크게, 텍스트 오른쪽으로 */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative w-16 h-16"> {/* 로고 그림 크기 키움 */}
            <Image src="/logo.svg" alt="KOAH Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col border-l-2 border-gray-100 pl-4 py-1">
            <span className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
              산위의 학교
            </span>
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
              KOH SCHOOL
            </span>
          </div>
        </Link>

        {/* 메뉴: 페이지가 없으면 일단 섹션 아이디(#)로 연결하거나 준비중 처리 */}
        <nav className="hidden md:flex gap-10 text-sm font-bold text-gray-500">
          <Link href="#about" className="hover:text-koahYellow transition-colors">About</Link>
          <Link href="#classes" className="hover:text-koahYellow transition-colors">Classes</Link>
          <Link href="#contact" className="hover:text-koahYellow transition-colors">Contact</Link>
        </nav>

        {/* 언어 선택기 */}
        <div className="flex items-center">
          <select
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold focus:outline-none"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  )
}
