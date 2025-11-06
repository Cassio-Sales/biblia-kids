'use client'

import { useParams } from 'next/navigation'
import { useState, type ReactElement } from 'react'
import StoryBook from '../../../Components/ui/StoryBook'

interface Story {
  title: string
  pages: string[]
  subtitles: string[]
  texts: string[]
}

const stories: Record<string, Story> = {
  'davi-golias': {
    title: 'Davi e Golias',
    pages: [
      '/assets/stories/davi-golias/1.png',
      '/assets/stories/davi-golias/2.jpg',
      '/assets/stories/davi-golias/3.jpg',
      '/assets/stories/davi-golias/4.jpg'
    ],
    subtitles: [
      'O Vale da Batalha',
      'O Jovem Pastor',
      'A Pedra e a Funda',
      'A Vitória do Senhor'
    ],
    texts: [
      `Os israelitas e os filisteus estavam em dois montes, com um vale entre eles.
      Todos os dias, um gigante chamado Golias saía do acampamento filisteu. Ele era enorme, usava armadura brilhante e uma lança pesada como um tronco.



Golias gritava: “Mandem um homem para lutar comigo! Se ele vencer, seremos seus servos.
Mas se eu vencer, vocês servirão a nós!” Durante quarenta dias, ele fez isso — e ninguém teve coragem de enfrentá-lo.`,

      `Mas Davi, ainda jovem, confiava em Deus.
Ele sabia que o Senhor é mais forte que qualquer inimigo, e não teve medo do gigante.`,

      `Com apenas uma pedra e uma funda, Davi derrotou Golias.
Todos ficaram admirados com a coragem daquele menino.`,

      `Deus abençoou Davi por sua fé.
Assim, o povo de Israel venceu e louvou o Senhor por Sua fidelidade!`
    ]
  }
}

export default function StoryPage(): ReactElement {
  const params = useParams<{ id: string }>()
  const id = params.id
  const story = stories[id]
  const [current, setCurrent] = useState<number>(0)

  if (!story) return <p>História não encontrada.</p>

  return (
    <main className="min-h-screen bg-[#fdfaf3] flex flex-col items-center py-6">
      {/* 🏷️ Título principal */}
      <h1 className="text-2xl md:text-4xl font-bold text-[#D97706] mb-3 text-center leading-tight px-3">
        {story.title}
      </h1>

      {/* 📖 Livro interativo */}
      <div className="w-full flex justify-center">
        <StoryBook
          pages={story.pages}
          subtitles={story.subtitles}
          texts={story.texts}
          onPageChange={setCurrent}
        />
      </div>
    </main>
  )
}
