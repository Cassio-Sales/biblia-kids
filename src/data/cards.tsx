import Image from 'next/image'

export const cards = [
  {
    id:'stories',
    title: 'Histórias',
    description: 'Explore as histórias bíblicas interativas.',
    header: (
      <div className="w-full aspect-square min-h-[200px] overflow-hidden rounded-md">
        <Image
          src="/assets/images/Noe.png"
          alt="História de Noé"
          width={400}
          height={400}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">📖</span>
  },
  {
    id: 'verses',
    title: 'Versículo do Dia',
    description: 'Receba uma palavra inspiradora diariamente.',
    header: (
      <div className="w-full aspect-square min-h-[200px] overflow-hidden rounded-md">
        <video
          src="/assets/videos/jesus2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">✨</span>
  },
  {
    id: 'games',
    title: 'Jogos',
    description: 'Aprenda brincando com jogos bíblicos divertidos.',
    header: (
      <div className="w-full aspect-square min-h-[200px] overflow-hidden rounded-md">
        <Image
          src="/assets/images/Jogos.png"
          alt="Jogos Bíblicos"
          width={400}
          height={400}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">🎮</span>
  },
  {
    id: 'prayer',
    title: 'Oração',
    description: 'Encontre um espaço para falar com Deus.',
    header: (
      <div className="w-full aspect-square min-h-[200px] overflow-hidden rounded-md">
        <Image
          src="/assets/images/homeimg1.png"
          alt="Momento de Oração"
          width={400}
          height={400}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">🙏</span>
  }
]
