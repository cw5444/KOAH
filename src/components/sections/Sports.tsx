import Image from 'next/image'

export default function Sports() {
  return (
    <section id="sports" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* 사진 영역: 여기에 태권도 사진을 넣습니다 */}
          <div className="w-full md:w-1/2 relative h-[450px] rounded-3xl overflow-hidden shadow-lg">
            <Image 
              src="/taekwondo.jpg" 
              alt="산위의 학교 태권도 수업" 
              fill 
              className="object-cover"
            />
          </div>

          {/* 텍스트 영역 */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-black mb-6">몸과 마음의 조화, 태권도</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              단순한 운동을 넘어 예절과 인내를 배웁니다. 
              아이들이 땀 흘리며 성장하는 생생한 현장을 확인해보세요.
            </p>
            {/* 밴드 링크(CTA) 추가 */}
            <a 
              href="https://www.band.us/band/92458697/post"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
            >
              공식 밴드에서 일상 사진 더보기 →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
