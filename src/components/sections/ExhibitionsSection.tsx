// src/components/sections/ExhibitionsSection.tsx
import dynamic from 'next/dynamic'

const GalleryClient = dynamic(() => import('@/components/GalleryClient'), { ssr: false })

export default function ExhibitionsSection() {
  return (
    <section id="exhibitions" className="scroll-mt-28 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">전시 / 독서 활동</h2>
        <p className="text-sm text-gray-600 mb-6">학생들의 작품과 활동 기록입니다. 이미지를 클릭하면 크게 볼 수 있습니다.</p>

        <GalleryClient category="exhibitions" initialCount={6} />
      </div>
    </section>
  )
}
