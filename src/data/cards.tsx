import Image from 'next/image'

export const cards = [
  {
    title: 'Histórias',
    description: 'Explore as histórias bíblicas interativas.',
    header: (
      <div
        className="overflow-hidden rounded-md"
        style={{ width: '100%', height: '300px' }}
      >
        <Image
          src="/assets/images/noe2.png"
          alt="História de Noé"
          width={400}
          height={300}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">📖</span>
  },
  {
    title: 'Versículo do Dia',
    description: 'Receba uma palavra inspiradora diariamente.',
    header: (
      <div
        className="overflow-hidden rounded-md"
        style={{ width: '100%', height: '300px' }}
      >
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
    title: 'Jogos',
    description: 'Aprenda brincando com jogos bíblicos divertidos.',
    header: (
      <div
        className="overflow-hidden rounded-md"
        style={{ width: '100%', height: '300px' }}
      >
        <Image
          src="/assets/images/jogos.png"
          alt="Jogos Bíblicos"
          width={400}
          height={300}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">🎮</span>
  },
  {
    title: 'Oração',
    description: 'Encontre um espaço para falar com Deus.',
    header: (
      <div
        className="overflow-hidden rounded-md"
        style={{ width: '100%', height: '300px' }}
      >
        <Image
          src="/assets/images/homeimg1.png"
          alt="Momento de Oração"
          width={400}
          height={300}
          className="w-full h-full object-fill rounded-md"
        />
      </div>
    ),
    icon: <span className="text-neutral-500">🙏</span>
  }
]
