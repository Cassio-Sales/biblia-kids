'use client'

import React from 'react'
import Image from 'next/image'

import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center">
      {/* Container corta 5% do topo da imagem */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/assets/images/homeimg1.png"
          alt="Crianca Orando"
          fill
          priority
          className="object-cover w-full h-full -translate-y-[2%]"
        />
      </div>

      {/* Conteúdo abaixo da imagem */}
      <div className="px-4 py-6 flex flex-col items-center">
        <TextGenerateEffect
          className="text-center text-6xl font-bold mb-4 text-[#D97706]"
          words="Bem-Vindo!"
        />

        <TypewriterEffect
          words={[
            {
              text: 'Deixem vir a mim as crianças, e não as impeçam, pois o reino de Deus pertence aos que são semelhantes a elas. — Marcos 10:14',
              className: 'text-[#40A099] font-bold'
            }
          ]}
          className="text-center text-2xl"
        />
      </div>
    </section>
  )
}

export default Hero
