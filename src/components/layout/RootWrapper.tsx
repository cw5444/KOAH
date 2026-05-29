'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/layout/Header'

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      {children}
    </LanguageProvider>
  )
}
