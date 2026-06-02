'use client'

import Image from 'next/image'

export default function About({ lang = 'ko' }: { lang?: string }) {
  const content = {
    ko: {
      title: '소개',
      p1: '산위의 학교는 2018년, 예향교회가 다음 세대를 섬기기 위해 시작한 기독대안학교입니다. 하나님의 나라를 확장해 가는 킹더마이저로 다음 세대가 세워지도록, 교회 공동체는 헌신과 수고로 주님의 인도하심을 따라 걸어왔습니다.',
      p2: '산위의 도시는 세상 가운데 빛을 발하며 선한 영향력을 흘려보내듯, 산위의 학교는 그러한 교육을 지향합니다. 학생 한 사람 한 사람이 하나님의 부르심 가운데 자라나 세상을 향한 빛과 소금의 역할을 감당하도록 돕는 교육을 실천하고 있습니다.',
      p3: '무엇보다 가정·교회·학교가 하나의 유기적 공동체를 이루어, 하나님 손 안에서 함께 지어져 가는 교육을 중요하게 여깁니다. 이 공동체적 교육 안에서 아이들은 관계 속에서 배우고, 삶 속에서 신앙을 경험합니다.',
      p4: '기독교 세계관 위에 세워진 성경적 삶의 문화를 확장해 가는 산위의 학교 가운데, 오늘도 주님의 행하심이 날마다 생생하게 이어지고 있습니다.'
    },
    en: {
      title: 'About',
      p1: 'KOAH School is a Christian alternative school founded in 2018 by Yehyang Church to serve the next generation. The school community walks in the Lord\'s guidance with dedication and commitment, nurturing the next generation as Kingdom Multipliers who expand God\'s kingdom.',
      p2: 'Just as the city on the mountain shines light into the world and spreads good influence, KOAH School pursues such education. We practice education that helps each student grow under God\'s calling and fulfill their role as light and salt to the world.',
      p3: 'Above all, we value education where home, church, and school form one organic community, growing together in God\'s hands. In this communal education, children learn through relationships and experience faith in their daily lives.',
      p4: 'At KOAH School, built on a Christian worldview and expanding biblical life culture, the work of the Lord continues to unfold vividly day by day.'
    }
  }
  const t = content[lang as 'ko' | 'en'] || content.ko

  return (
    <section id="about" className="py-20 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-black mb-6">{t.title}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{t.p1}</p>
          <p className="text-gray-600 mb-4 leading-relaxed">{t.p2}</p>
          <p className="text-gray-600 mb-4 leading-relaxed">{t.p3}</p>
          <p className="text-gray-600 leading-relaxed">{t.p4}</p>
        </div>

        <div className="md:w-1/2 relative h-48 md:h-96 rounded-2xl overflow-hidden shadow-sm">
          <Image src="/gotogether.jpg" alt="About image" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
