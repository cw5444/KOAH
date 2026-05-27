'use client'

export default function Classes({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '수업 소개',
      items: [
        '자연 관찰 수업',
        '전통 놀이와 예절',
        '태권도와 신체 활동'
      ]
    },
    en: {
      title: 'Classes',
      items: [
        'Nature observation',
        'Traditional games & manners',
        'Taekwondo & physical activity'
      ]
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="classes" className="py-20 bg-gray-50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-6">{t.title}</h2>
        <ul className="space-y-3 text-gray-700">
          {t.items.map((it, idx) => (
            <li key={idx} className="pl-4 border-l-4 border-green-500/20 py-2">
              {it}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
