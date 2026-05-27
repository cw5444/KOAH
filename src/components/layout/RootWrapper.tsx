'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import Header from './Header'

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      {children}
    </LanguageProvider>
  )
}
