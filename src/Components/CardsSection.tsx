'use client'

import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { cards } from '../data/cards' 

const CardsSection = () => {
  return (
    <BentoGrid>
      {cards.map((card, index) => (
        <BentoGridItem
          key={index}
          title={card.title}
          description={card.description}
          header={card.header}
          icon={card.icon}
        />
      ))}
    </BentoGrid>
  )
}

export default CardsSection
