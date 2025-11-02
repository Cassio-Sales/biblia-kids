'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import StoryBook from '../../../Components/ui/StoryBook'
import { TypewriterEffect } from '../../../Components/ui/Typewriter'

// 📘 Dicionário de histórias
const stories = {
  'davi-golias': {
    title: 'Davi e Golias',
    pages: [
      '/assets/stories/davi-golias/1.png',
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

  // ✨ Estado que força o React a recriar o texto quando a página vira
  const [textTrigger, setTextTrigger] = useState(0)

  if (!story) return <p>História não encontrada.</p>

  // ✨ Função chamada toda vez que o usuário vira uma página
  const handlePageChange = (page: number) => {
    setCurrent(page) // atualiza a página atual
    setTextTrigger(prev => prev + 1) // força o Typewriter a reiniciar
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-8">
      {/* Título da história */}
      <h1 className="text-3xl md:text-5xl font-bold text-[#D97706] mb-6 text-center">
        {story.title}
      </h1>

      {/* Livro de páginas com evento de virada */}
      <div className="w-full flex justify-center">
        <StoryBook
          pages={story.pages}
          onPageChange={handlePageChange} //  Agora o texto reage à virada da página
        />
      </div>

      {/* Texto narrado que reinicia a animação em cada página */}
      <div key={textTrigger} className="mt-6 px-4 text-center max-w-md">
        <TypewriterEffect
          words={[{ text: story.texts[current], className: 'text-[#40A099]' }]}
          className="text-xl md:text-2xl"
        />
      </div>
    </main>
  )
}
