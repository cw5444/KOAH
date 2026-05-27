'use client'

export default function Contact({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '문의하기',
      desc: '수업이나 방문 문의는 아래 링크로 연락주세요.',
      contactText: '문의하기'
    },
    en: {
      title: 'Contact',
      desc: 'For class or visit inquiries, please reach out via the link below.',
      contactText: 'Contact us'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-black mb-4">{t.title}</h2>
        <p className="text-gray-600 mb-8">{t.desc}</p>
        <a
          href="mailto:cw5444@gmail.com"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors"
        >
          {t.contactText}
        </a>
      </div>
    </section>
  )
}
