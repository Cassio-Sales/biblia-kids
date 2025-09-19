'use client'

import React from 'react'
import Image from 'next/image'

import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'
import { Baloo_2 } from 'next/font/google'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['700'] })

const Hero = () => {
  const handleStart = () => {
    console.log('Entrar clicado')
    // aqui você pode redirecionar ou iniciar a navegação
  }

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

        {/* Botão logo abaixo do Bem-Vindo */}
        <div className="my-6">
          <button
            onClick={handleStart}
            className={`${baloo.className} bg-[#40A099] text-white px-10 py-2 rounded-full shadow-lg hover:bg-amber-600 transition`}
          >
            <span className="text-3xl font-bold tracking-wide ">
              COMEÇAR LEITURA
            </span>
          </button>
        </div>

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
