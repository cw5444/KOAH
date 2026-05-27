'use client'

import Image from 'next/image'

export default function Journey({ lang }: { lang: string }) {
  const content = {
    ko: {
      title: "고투게더 (Go-Together)",
      sub: "함께 걷고, 함께 배우며, 함께 성장합니다.",
      card1: "동행의 시작",
      card2: "성장의 결실"
    },
    en: {
      title: "Go-Together",
      sub: "Walking together, learning together, growing together.",
      card1: "Starting Together",
      card2: "Fruit of Growth"
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko;

  return (
    <section id="journey" className="relative h-[120vh]"> {/* 높이를 충분히 줌 */}
      {/* 고투게더 대형 배경 (상단) */}
      <div className="sticky top-0 h-[60vh] w-full relative overflow-hidden">
        <Image 
          src="/gotogether.jpg" 
          alt="Go-Together" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
          <h2 className="text-4xl md:text-6xl font-black mb-4">{t.title}</h2>
          <p className="text-xl md:text-2xl font-light opacity-90">{t.sub}</p>
        </div>
      </div>

      {/* 졸업 사진이 겹쳐지는 영역 (하단) */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-black">
        <Image 
          src="/graduate.jpg" 
          alt="Graduate" 
          fill 
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-4 border-white/30 p-8 md:p-12">
                <p className="text-white text-3xl md:text-5xl font-black">{t.card2}</p>
            </div>
        </div>
      </div>
    </section>
  )
}
