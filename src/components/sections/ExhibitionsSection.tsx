'use client'

import dynamic from 'next/dynamic'
const GalleryClient = dynamic(() => import('@/components/GalleryClient'), { ssr: false })

export default function ExhibitionsSection({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '전시 / 독서 활동',
      desc: '학생들의 작품과 활동 기록입니다. 이미지를 클릭하면 크게 볼 수 있습니다.'
    },
    en: {
      title: 'Exhibitions & Reading Activities',
      desc: 'Student artworks and activity records. Click an image to view it larger.'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="exhibitions" className="scroll-mt-28 py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">{t.title}</h2>
        <p className="text-sm text-gray-600 mb-6">{t.desc}</p>

        <GalleryClient category="exhibitions" initialCount={6} lang={lang} />
      </div>
    </section>
  )
}
