'use client'

import React from 'react'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 px-4 sm:py-16 sm:px-6">
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center">
        {/* Texto "Bem Vindo" com efeito rápido */}
        <TextGenerateEffect
          className="text-center text-5xl sm:text-3xl font-bold mb-4 text-[#D97706]"
          words="Bem-Vindo!"
        />

        {/* Texto bíblico com Typewriter */}
        <TypewriterEffect
          words={[
            {
              text: 'Deixem vir a mim as crianças, e não as impeçam, pois o reino de Deus pertence aos que são semelhantes a elas. — Marcos 10:14',
              className: 'text-[#40A099] font-bold'
            }
          ]}
          className="text-center text-sm sm:text-base text-2xl sm:text-3xl"
        />
      </div>
    </section>
  )
}

export default Hero
