// src/components/GalleryClient.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

type ImgItem = { file: string; alt?: string; caption?: string }

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
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return
        const list: ImgItem[] = json[category] ?? []
        setItems(list)
      })
      .catch(() => setItems([]))
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

  if (!items.length) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.slice(0, visibleCount).map((it, i) => (
          <figure
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded"
            onClick={() => openLightbox(i)}
          >
            <div className="w-full aspect-[4/3] bg-gray-100 relative">
              <Image
                src={it.file}
                alt={it.alt ?? ''}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            {it.caption && <figcaption className="mt-2 text-xs text-gray-600">{it.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {items.length > initialCount && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded((s) => !s)}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            {isExpanded ? '간단히 접기' : `더 보기 (${items.length - visibleCount > 0 ? items.length - visibleCount : items.length - initialCount} 장 더)` }
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
            <div className="relative w-full h-[70vh] md:h-[80vh] bg-black">
              <Image
                src={items[lightboxIndex].file}
                alt={items[lightboxIndex].alt ?? ''}
                fill
                className="object-contain"
              />
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
