'use client'

import { BentoGrid, BentoGridItem } from '../../Components/ui/BentoGrid'
import { useRouter } from 'next/navigation'

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
}

const stories = [
  {
    id: 'davi-golias',
    title: 'Davi e Golias',
    description: 'Com fé em Deus, Davi vence o gigante Golias.',
    image: '/assets/stories/davi-golias/capa.png'
  },
  {
    id: 'criacao',
    title: 'A Criação do Mundo',
    description: 'Deus criou tudo com amor e sabedoria.',
    image: '/assets/stories/criacao/capa.jpg'
  },
  {
    id: 'noe',
    title: 'A Arca de Noé',
    description: 'Noé constrói uma arca e salva os animais do dilúvio.',
    image: '/assets/stories/noe/capa.jpg'
  },
  {
    id: 'prodigo',
    title: 'O Filho Pródigo',
    description: 'Um filho aprende sobre perdão e amor de seu pai.',
    image: '/assets/stories/prodigo/capa.jpg'
  },
]

export default function StoriesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-[#D97706] mb-8">
        Escolha uma História
      </h1>

      <BentoGrid className="max-w-4xl">
        {stories.map(story => (
          <div
            key={story.id}
            className="cursor-pointer"
            onClick={() => router.push(`/stories/${story.id}`)}
          >
            <BentoGridItem
              title={story.title}
              description={story.description}
              header={
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              }
            />
          </div>
        ))}
      </BentoGrid>
    </main>
  )
}
