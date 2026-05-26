'use client'

import Image from 'next/image'

export default function Journey() {
  return (
    <section id="journey" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/gotogether.jpg"
        alt="Journey Background"
        fill
        className="object-cover object-center z-0"
        priority
      />
      
      {/* 이미지 위 오버레이 (텍스트 가독성을 위해) */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* 콘텐츠 */}
      <div className="relative z-20 text-center text-white px-6">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          OUR JOURNEY
        </h2>
        <p className="text-xl md:text-2xl font-light opacity-90">
          함께 걷는 산위의 학교 이야기
        </p>
      </div>
    </section>
  )
}
