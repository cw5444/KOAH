// src/components/GalleryClient.tsx
'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type ImgItem = { file: string; alt?: string; caption?: string }

function getFallbackPair(file: string) {
  // file이 "/images/exhibitions/art-01.webp" 또는 ".jpg" 같은 형태라고 가정
  const base = file.replace(/\.webp$|\.jpg$|\.jpeg$/i, '')
  return {
    webp: base + '.webp',
    jpg: base + '.jpg'
  }
}

export default function GalleryClient({
  category = 'exhibitions',
  initialCount = 6
}: {
  category?: string
  initialCount?: number
}) {
  const [items, setItems] = useState<ImgItem[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(initialCount)
  const [isExpanded, setIsExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/images/gallery.json')
      .then((r) => {
        if (!r.ok) throw new Error('gallery.json fetch failed: ' + r.status)
        return r.json()
      })
      .then((json) => {
        if (!mounted) return
        const list: ImgItem[] = json[category] ?? []
        setItems(list)
      })
      .catch((err) => {
        console.error(err)
        setItems([])
      })
    return () => {
      mounted = false
    }
  }, [category])

  useEffect(() => {
    if (isExpanded) setVisibleCount(items.length)
    else setVisibleCount(initialCount)
  }, [isExpanded, items.length, initialCount])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((i) => (i! > 0 ? i! - 1 : items.length - 1))
  }, [lightboxIndex, items.length])

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((i) => (i! < items.length - 1 ? i! + 1 : 0))
  }, [lightboxIndex, items.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  // --- custom preview logic for "exhibitions" when collapsed ---
  const previewItems = useMemo(() => {
    if (!items.length) return []
    if (category !== 'exhibitions') return items.slice(0, visibleCount)

    if (isExpanded) return items.slice(0, visibleCount)

    // collapsed: show one 'student artwork' then pick diverse others
    const studentArts = items.filter((it) =>
      /art-|student|학생|학생 작품/i.test(it.file + ' ' + (it.caption ?? '') + ' ' + (it.alt ?? ''))
    )
    const others = items.filter((it) => !studentArts.includes(it))

    const result: ImgItem[] = []
    if (studentArts.length) result.push(studentArts[0]) // 한 개만
    // fill with distinct other categories up to initialCount
    let idx = 0
    while (result.length < Math.max(1, visibleCount) && idx < others.length) {
      result.push(others[idx])
      idx++
    }
    // fallback: if still fewer, add more studentArts
    let sidx = 1
    while (result.length < Math.max(1, visibleCount) && sidx < studentArts.length) {
      result.push(studentArts[sidx++])
    }
    return result
  }, [items, category, isExpanded, visibleCount])

  if (!items.length) return null

  const renderImage = (it: ImgItem, i: number) => {
    const { webp, jpg } = getFallbackPair(it.file)
    return (
      <figure
        key={i}
        className="relative group cursor-pointer overflow-hidden rounded"
        onClick={() => openLightbox(i)}
      >
        <div className="w-full aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
          {/* picture + img fallback */}
          <picture className="w-full h-full block">
            <source srcSet={webp} type="image/webp" />
            <img
              src={jpg}
              alt={it.alt ?? ''}
              loading="lazy"
              className="object-cover w-full h-full block transition-transform duration-300 group-hover:scale-105"
            />
          </picture>
        </div>
        {it.caption && <figcaption className="mt-2 text-xs text-gray-600">{it.caption}</figcaption>}
      </figure>
    )
  }

  // use previewItems when collapsed; otherwise use items.slice(0, visibleCount)
  const listToShow = isExpanded ? items.slice(0, visibleCount) : previewItems

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {listToShow.map((it, i) => renderImage(it, i))}
      </div>

      {items.length > initialCount && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded((s) => !s)}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            {isExpanded ? '간단히 접기' : `더 보기 (${items.length - (isExpanded ? items.length : listToShow.length)} 장 더)` }
          </button>
        </div>
      )}

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] md:h-[80vh] bg-black flex items-center justify-center">
              {/* Lightbox: try webp then jpg */}
              <picture className="w-full h-full block">
                <source srcSet={getFallbackPair(items[lightboxIndex].file).webp} type="image/webp" />
                <img
                  src={getFallbackPair(items[lightboxIndex].file).jpg}
                  alt={items[lightboxIndex].alt ?? ''}
                  className="object-contain w-full h-full"
                />
              </picture>
            </div>

            {items[lightboxIndex].caption && (
              <div className="mt-2 text-sm text-white/90">{items[lightboxIndex].caption}</div>
            )}

            <button
              onClick={closeLightbox}
              aria-label="close"
              className="absolute top-3 right-3 text-white bg-black/40 p-2 rounded-full"
            >
              ✕
            </button>

            <button
              onClick={showPrev}
              aria-label="previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={showNext}
              aria-label="next"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
