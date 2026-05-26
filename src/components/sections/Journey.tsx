'use client'

import Image from 'next/image'

export default function Journey() {
  return (
    <section id="journey" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">Our Journey</h2>
          <p className="text-gray-500">산위의 학교가 함께 걸어온 성장의 기록들입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 첫 번째 카드: 함께하는 여정 */}
          <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
            <Image 
              src="/gotogether.jpg" 
              alt="함께하는 여정" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Together</h3>
              <p className="opacity-80">서로 격려하며 함께 걷는 소중한 시간들</p>
            </div>
          </div>

          {/* 두 번째 카드: 졸업 및 결실 */}
          <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
            <Image 
              src="/graduate.jpg" 
              alt="졸업과 새로운 시작" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <p className="opacity-80">배움을 마치고 더 넓은 세상으로 나아가는 순간</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
