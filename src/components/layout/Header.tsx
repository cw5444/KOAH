'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('ko')

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        
        {/* 로고 영역: 그림(logo.png) + 글씨(logo_text.png) */}
        <Link href="/" className="flex items-center gap-4">
          {/* 1. 그림 아이콘 */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="산위의 학교 로고" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
          
          {/* 구별선 (선택 사항: 사진 느낌에 따라 빼셔도 됩니다) */}
          <div className="h-12 w-[1px] bg-gray-200" />

          {/* 2. 글씨 이미지 */}
          <div className="relative w-48 h-16 flex-shrink-0">
            <Image 
              src="/logo_text.png" 
              alt="산위의 학교" 
              fill 
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden lg:flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <Link href="#about" className="hover:text-black transition-colors">About</Link>
          <Link href="#classes" className="hover:text-black transition-colors">Classes</Link>
          <Link href="#contact" className="hover:text-black transition-colors">Contact</Link>
        </nav>

        {/* 언어 선택기 */}
        <div className="flex items-center">
          <select
            className="appearance-none font-bold text-xs bg-gray-50 border border-gray-100 rounded-full px-5 py-2 cursor-pointer focus:outline-none hover:bg-gray-100 transition-colors"
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
