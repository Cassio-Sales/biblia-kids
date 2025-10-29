'use client'

import Link from 'next/link'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { cards } from '../data/cards'

const CardsSection = () => {
  return (
    <BentoGrid>
      {cards.map(card => (
        <Link
          key={card.id}
          href={`/${card.id}`}
          className="transition-transform hover:scale-[1.02] duration-200"
        >
          <BentoGridItem
            title={card.title}
            description={card.description}
            header={card.header}
            icon={card.icon}
          />
        </Link>
      ))}
    </BentoGrid>
  )
}

export default CardsSection
