'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [lang, setLang] = useState('ko')

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        
        {/* 사용자가 준 그림(좌) + 텍스트(우) 정렬 */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image 
              src="/logo.png"  // 방금 public에 넣은 파일명 (png/webp 등 확장자 확인)
              alt="산위의 학교 로고" 
              fill 
              className="object-contain" 
              priority 
            />
          </div>
          
          <div className="flex flex-col border-l border-gray-200 pl-4 py-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-1">
              산위의 학교
            </h1>
            <p className="text-sm font-bold text-gray-400 tracking-[0.2em] uppercase">
              KOH SCHOOL
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <Link href="#about" className="hover:text-black transition-colors">About</Link>
          <Link href="#classes" className="hover:text-black transition-colors">Classes</Link>
          <Link href="#contact" className="hover:text-black transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center">
          <select
            className="appearance-none font-bold text-xs bg-gray-50 border border-gray-100 rounded-full px-5 py-2 cursor-pointer focus:outline-none hover:bg-gray-100"
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
