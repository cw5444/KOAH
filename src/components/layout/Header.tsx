'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('ko')

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        
        {/* LOGO 영역: 사진처럼 그림+글씨가 합쳐진 로고 하나만 왼쪽 배치 */}
        <Link href="/" className="flex items-center">
          <div className="relative w-28 h-28 flex-shrink-0">
            <Image 
              src="/logo.svg" 
              alt="산위의 학교 로고" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden lg:flex gap-12 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <Link href="#about" className="hover:text-koahYellow transition-colors">About</Link>
          <Link href="#classes" className="hover:text-koahYellow transition-colors">Classes</Link>
          <Link href="#contact" className="hover:text-koahYellow transition-colors">Contact</Link>
        </nav>

        {/* 언어 선택기 */}
        <div className="flex items-center">
          <select
            className="appearance-none font-bold text-xs bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 cursor-pointer focus:outline-none hover:bg-gray-100 transition-colors"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="ko">KOREAN</option>
            <option value="en">ENGLISH</option>
          </select>
        </div>
      </div>
    </header>
  )
}
