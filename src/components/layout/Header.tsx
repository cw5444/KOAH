'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('ko')

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* LOGO 영역: 아이콘(좌) + 텍스트(우) */}
        <Link href="/" className="flex items-center gap-5">
          {/* 아이콘 크기를 더 키웠습니다 (w-20 h-20) */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image 
              src="/logo.svg" 
              alt="산위의 학교 로고" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
          
          {/* 텍스트 배치: 한글은 크게, 영어는 작게 밑으로 */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-1.5">
              산위의 학교
            </h1>
            <p className="text-sm font-bold text-gray-400 tracking-[0.25em] uppercase pl-1">
              KOH SCHOOL
            </p>
          </div>
        </Link>

        {/* 네비게이션: 섹션으로 이동하도록 수정됨 */}
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
