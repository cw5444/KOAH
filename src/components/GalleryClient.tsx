// src/components/GalleryClient.tsx
'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type ImgItem = { file: string; alt?: string; caption?: string }

function getFallbackPair(file: string) {
  const base = file.replace(/\.webp$|\.jpg$|\.jpeg$/i, '')
  return {
    webp: base + '.webp',
    jpg: base + '.jpg'
  }
}

export default function GalleryClient({
  category = 'exhibitions',
  initialCount = 6,
  lang = 'ko'
}: {
  category?: string
  initialCount?: number
  lang?: string
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

        // Normalize json keys -> merge exhibition-related keys into a single list
        const makeListFrom = (keys: string[]) => {
          const seen = new Set<string>()
          const out: ImgItem[] = []
          for (const k of keys) {
            const arr = json[k] ?? []
            if (!Array.isArray(arr)) continue
            for (const it of arr) {
              if (!it || typeof it.file !== 'string') continue
              if (!seen.has(it.file)) {
                seen.add(it.file)
                out.push(it as ImgItem)
              }
            }
          }
          return out
        }

        let list: ImgItem[] = []
        if (category === 'exhibitions') {
          // gather keys that look like exhibitions / display / exhibit / 전시 등
          const allKeys = Object.keys(json)
          const exhibitKeys = allKeys.filter((k) =>
            /exhibit|display|전시|전시\s?디스플레이|디스플레이|exhibit-photos|exhibit_photos|exhibit_photos/i.test(k)
          )
          // make sure 'exhibitions' (if present) is included first
          if (json['exhibitions'] && !exhibitKeys.includes('exhibitions')) exhibitKeys.unshift('exhibitions')
          // if no exhibit-like keys found, fallback to 'exhibitions' or the default category key
          if (exhibitKeys.length === 0) {
            if (Array.isArray(json['exhibitions'])) list = makeListFrom(['exhibitions'])
            else list = json[category] ?? []
          } else {
            list = makeListFrom(exhibitKeys)
          }
        } else {
          // default behavior for other categories
          list = json[category] ?? []
        }

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

  const labels = {
    ko: {
      collapse: '간단히 접기',
      showMore: '더 보기',
      moreSuffix: '장 더',
      close: '닫기',
      previous: '이전',
      next: '다음'
    },
    en: {
      collapse: 'Collapse',
      showMore: 'Show more',
      moreSuffix: 'more',
      close: 'Close',
      previous: 'Previous',
      next: 'Next'
    }
  }
  const L = (labels as any)[lang] || labels.ko

  // categorize helper — "exhibition"으로 통합 (display, exhibit, 전시 관련)
  const categorize = (it: ImgItem) => {
    const text = (it.file + ' ' + (it.caption ?? '') + ' ' + (it.alt ?? '')).toLowerCase()
    if (/(?:\bart-|\b미술|\b미술작품|artwork)/i.test(text)) return 'art'
    if (/(?:전시|display|exhibit|전시\s?디스플레이|디스플레이|rothem|olive|palm|exhibit|exhibit-photos|exhibit_photos)/i.test(text)) return 'exhibition'
    if (/(?:독서|reading|book|읽기|booklog|mindmap)/i.test(text)) return 'reading'
    return 'other'
  }

  const previewItems = useMemo(() => {
    if (!items.length) return []
    if (category !== 'exhibitions') return items.slice(0, visibleCount)
    if (isExpanded) return items.slice(0, visibleCount)

    const byCategory: Record<string, ImgItem[]> = {
      art: [],
      exhibition: [],
      reading: [],
      other: []
    }

    for (const it of items) {
      const cat = categorize(it)
      byCategory[cat].push(it)
    }

    const result: ImgItem[] = []
    // prefer: art(미술작품) 1개, exhibition(전시) 1개, reading 1개, then fill others
    if (byCategory.art.length) result.push(byCategory.art[0])
    if (result.length < visibleCount && byCategory.exhibition.length) result.push(byCategory.exhibition[0])
    if (result.length < visibleCount && byCategory.reading.length) result.push(byCategory.reading[0])

    // fill with other, then remaining exhibition/art/reading
    let idx = 0
    while (result.length < Math.max(1, visibleCount) && idx < byCategory.other.length) {
      result.push(byCategory.other[idx++])
    }
    let e = 1
    while (result.length < Math.max(1, visibleCount) && e < byCategory.exhibition.length) {
      result.push(byCategory.exhibition[e++])
    }
    let a = 1
    while (result.length < Math.max(1, visibleCount) && a < byCategory.art.length) {
      result.push(byCategory.art[a++])
    }
    let r = 1
    while (result.length < Math.max(1, visibleCount) && r < byCategory.reading.length) {
      result.push(byCategory.reading[r++])
    }

    if (result.length < Math.max(1, visibleCount)) {
      for (const it of items) {
        if (result.includes(it)) continue
        result.push(it)
        if (result.length >= visibleCount) break
      }
    }

    return result
  }, [items, category, isExpanded, visibleCount])

  if (!items.length) return null

  const renderImage = (it: ImgItem, globalIndex: number) => {
    const { webp, jpg } = getFallbackPair(it.file)
    return (
      <figure
        key={globalIndex}
        className="relative group cursor-pointer overflow-hidden rounded"
        onClick={() => openLightbox(globalIndex)}
      >
        <div className="w-full aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
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

  const listToShow = isExpanded ? items.slice(0, visibleCount) : previewItems

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {listToShow.map((it) => {
          const globalIdx = items.indexOf(it)
          return renderImage(it, globalIdx)
        })}
      </div>

      {items.length > initialCount && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded((s) => !s)}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            {isExpanded ? L.collapse : `${L.showMore} (${items.length - listToShow.length} ${L.moreSuffix})`}
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
          <div className="relative max-w-[95vw] max-h-[95vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[70vh] md:h-[80vh] bg-black flex items-center justify-center">
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
              aria-label={L.close}
              className="absolute top-3 right-3 text-white bg-black/40 p-2 rounded-full"
            >
              ✕
            </button>

            <button
              onClick={showPrev}
              aria-label={L.previous}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={showNext}
              aria-label={L.next}
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
