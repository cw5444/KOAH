'use client'

import Image from 'next/image'

export default function Sports({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '몸과 마음의 조화, 태권도',
      desc: '단순한 운동을 넘어 예절과 인내를 배웁니다. 아이들이 땀 흘리며 성장하는 생생한 현장을 확인해보세요.',
      cta: '공식 밴드에서 일상 사진 더보기 →'
    },
    en: {
      title: 'Balance of Body & Mind — Taekwondo',
      desc: 'More than exercise: learning manners and perseverance. See our students growing through practice.',
      cta: 'See more daily photos on the official band →'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="sports" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 relative h-[450px] rounded-3xl overflow-hidden shadow-lg">
            <Image 
              src="/taekwondo.jpg" 
              alt="산위의 학교 태권도 수업" 
              fill 
              className="object-cover"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-black mb-6">{t.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t.desc}</p>
            <a 
              href="https://www.band.us/band/92458697/post"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
