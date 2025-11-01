'use client'

import Link from 'next/link'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { cards } from '../data/cards'

const CardsSection = () => {
  return (
    <BentoGrid>
      {cards.map((card) => (
        <Link
          key={card.id}
          href={`/${card.id}`}
          className="
            block rounded-xl
            transition-transform duration-150
            active:scale-[0.96]
            active:brightness-90
            active:ring-4
            active:ring-[#40A099]
            active:ring-offset-2
          "
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
