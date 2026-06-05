'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '산위의 학교에 오신 것을 환영합니다',
      subtitle: '하나님 나라를 확장하는 킹더마이저로 자라나는 곳',
      cta: '더 알아보기'
    },
    en: {
      title: 'Welcome to KOAH School',
      subtitle: 'Growing as Kingdom Multipliers expanding God\'s kingdom',
      cta: 'Learn more'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="hero" className="py-0 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* 텍스트 */}
        <div className="text-center pt-20 pb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-10">{t.subtitle}</p>
          <Link
            href="#about"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
          >
            {t.cta}
          </Link>
        </div>

        {/* 이미지 */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image src="/gotogether.jpg" alt="Hero image" fill className="object-cover" />
        </div>

        <div className="h-20" />
      </div>
    </section>
  )
}
