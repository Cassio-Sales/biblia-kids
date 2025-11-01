'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import StoryBook from '../../../Components/ui/StoryBook'
import { TypewriterEffect } from '../../../Components/ui/Typewriter'

// Dicionário de histórias
const stories = {
  'davi-golias': {
    title: 'Davi e Golias',
    pages: [
      '/assets/stories/davi-golias/1.jpg',
      '/assets/stories/davi-golias/2.jpg',
      '/assets/stories/davi-golias/3.jpg',
      '/assets/stories/davi-golias/4.jpg'
    ],
    texts: [
      'O exército de Israel estava com medo do gigante Golias.',
      'Mas Davi confiava que Deus era mais forte que qualquer inimigo.',
      'Com apenas uma pedra e uma funda, ele derrotou o gigante.',
      'Deus abençoou Davi por sua fé e coragem!'
    ]
  }
  // outras histórias podem ser adicionadas aqui
}

export default function StoryPage() {
  const { id } = useParams()
  const story = stories[id as keyof typeof stories]
  const [current, setCurrent] = useState(0)

  if (!story) return <p>História não encontrada.</p>

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-[#D97706] mb-6 text-center">
        {story.title}
      </h1>

      {/* Livro de páginas */}
      <div className="w-full flex justify-center">
        <StoryBook
          pages={story.pages}
          onPageChange={page => setCurrent(page)}
        />
      </div>

      {/* Texto narrado */}
      <div className="mt-6 px-4 text-center max-w-md">
        <TypewriterEffect
          words={[{ text: story.texts[current], className: 'text-[#40A099]' }]}
          className="text-xl md:text-2xl"
        />
      </div>
    </main>
  )
}
