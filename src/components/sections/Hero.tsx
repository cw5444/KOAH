'use client'

import Link from 'next/link'

export default function Hero({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '산위의 학교에 오신 것을 환영합니다',
      subtitle: '자연과 함께 배우는 행복한 학교',
      cta: '더 알아보기'
    },
    en: {
      title: 'Welcome to KOAH School',
      subtitle: 'A joyful school learning with nature',
      cta: 'Learn more'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="hero" className="py-28 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-10">{t.subtitle}</p>
        <Link
          href="#about"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
