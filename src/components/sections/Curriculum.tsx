'use client'

export default function Curriculum({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '교육과정',
      p: '연간 교육과정은 자연 관찰, 협동 프로젝트, 공연 및 졸업식으로 구성됩니다.'
    },
    en: {
      title: 'Curriculum',
      p: 'The yearly curriculum includes nature observation, collaborative projects, performances, and graduation.'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="curriculum" className="py-20 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-4">{t.title}</h2>
        <p className="text-gray-600">{t.p}</p>
      </div>
    </section>
  )
}
