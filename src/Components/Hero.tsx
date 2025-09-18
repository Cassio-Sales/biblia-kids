'use client'

import React from 'react'
import Image from 'next/image'

import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center">
      {/* Imagem ocupa largura total no mobile */}
      <div className="w-full">
        <Image
          src="/assets/images/homeimg1.png"
          alt="Crianca Orando"
          width={800} // base menor, já focado em mobile
          height={450}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Conteúdo abaixo da imagem */}
      <div className="px-4 py-6 flex flex-col items-center">
        <TextGenerateEffect
          className="text-center text-4xl font-bold mb-4 text-[#D97706]"
          words="Bem-Vindo!"
        />

        <TypewriterEffect
          words={[
            {
              text: 'Deixem vir a mim as crianças, e não as impeçam, pois o reino de Deus pertence aos que são semelhantes a elas. — Marcos 10:14',
              className: 'text-[#40A099] font-bold'
            }
          ]}
          className="text-center text-base"
        />
      </div>
    </section>
  )
}

export default Hero
