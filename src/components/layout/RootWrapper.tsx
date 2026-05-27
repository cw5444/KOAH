'use client'

import { useState, Children, isValidElement, cloneElement, ReactElement } from 'react'
import Header from './Header'

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState('ko')

  // children(프래그먼트 안의 섹션들 포함) 각각에 lang prop을 주입
  const childrenWithLang = Children.map(children, (child) => {
    if (isValidElement(child)) {
      // any 타입으로 캐스트해서 타입 체크 문제를 최소화
      return cloneElement(child as ReactElement<any>, { lang })
    }
    return child
  })

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      {childrenWithLang}
    </>
  )
}
