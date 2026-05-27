'use client'

import Image from 'next/image'

export default function About({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '소개',
      p1: '산위의 학교는 자연 속에서 전인적 성장을 돕는 공간입니다.',
      p2: '작은 공동체에서 서로 배우고 함께 자라납니다.'
    },
    en: {
      title: 'About',
      p1: 'KOAH School nurtures holistic growth in nature.',
      p2: 'We learn and grow together in a small community.'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-black mb-4">{t.title}</h2>
          <p className="text-gray-600 mb-4">{t.p1}</p>
          <p className="text-gray-600">{t.p2}</p>
        </div>

        <div className="md:w-1/2 relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm">
          <Image src="/gotogether.jpg" alt="About image" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
