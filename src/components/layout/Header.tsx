'use client'

import { useState } from 'react'

export default function Header() {
  const [lang, setLang] = useState('en')

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3 shadow">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-koahYellow text-sm font-bold text-white">
          KOAH
        </div>
        <span className="text-lg font-semibold">KOAH</span>
      </div>

      <div>
        <select
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Language switcher"
        >
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </select>
      </div>
    </header>
  )
}
