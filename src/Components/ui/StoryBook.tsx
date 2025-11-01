'use client'

import dynamic from 'next/dynamic'
import { CSSProperties } from 'react'

//Importa o componente dinamicamente para evitar erro no SSR
const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false })

interface StoryBookProps {
  pages: string[]
  onPageChange?: (page: number) => void
}

export default function StoryBook({ pages, onPageChange }: StoryBookProps) {
  const bookStyle: CSSProperties = {
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
    borderRadius: '16px'
  }

  return (
    <HTMLFlipBook
      width={320}
      height={420}
      className="mx-auto rounded-lg shadow-lg"
      mobileScrollSupport
      showCover={false}
      onFlip={e => onPageChange && onPageChange(e.data)}
      style={bookStyle}
    >
      {pages.map((src, i) => (
        <div
          key={i}
          className="bg-white flex justify-center items-center overflow-hidden rounded-lg"
        >
          <img
            src={src}
            alt={`Página ${i + 1}`}
            className="object-contain w-full h-full rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </HTMLFlipBook>
  )
}
