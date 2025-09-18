import Image from 'next/image'

export const cards = [
  {
    title: 'Histórias',
    description: 'Explore as histórias bíblicas interativas.',
    header: (
      <Image
        src="/assets/images/homeimg1.png"
        alt="Histórias Bíblicas"
        width={400}
        height={200}
        className="w-full h-24 object-cover rounded-md"
      />
    ),
    icon: <span className="text-neutral-500">📖</span>
  },
  {
    title: 'Versículo do Dia',
    description: 'Receba uma palavra inspiradora diariamente.',
    header: (
      <Image
        src="/assets/images/homeimg1.png"
        alt="Versículo do Dia"
        width={400}
        height={200}
        className="w-full h-24 object-cover rounded-md"
      />
    ),
    icon: <span className="text-neutral-500">✨</span>
  },
  {
    title: 'Jogos',
    description: 'Aprenda brincando com jogos bíblicos divertidos.',
    header: (
      <Image
        src="/assets/images/homeimg1.png"
        alt="Jogos Bíblicos"
        width={400}
        height={200}
        className="w-full h-24 object-cover rounded-md"
      />
    ),
    icon: <span className="text-neutral-500">🎮</span>
  },
  {
    title: 'Oração',
    description: 'Encontre um espaço para falar com Deus.',
    header: (
      <Image
        src="/assets/images/homeimg1.png"
        alt="Momento de Oração"
        width={400}
        height={200}
        className="w-full h-24 object-cover rounded-md"
      />
    ),
    icon: <span className="text-neutral-500">🙏</span>
  }
]
