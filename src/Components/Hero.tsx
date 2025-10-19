'use client'

import Image from 'next/image'
import { Baloo_2 } from 'next/font/google'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'
import { useDailyVerse } from '../hooks/useDailyVerse'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['700'] })

export default function Hero() {
  const { data: versiculo, loading, error } = useDailyVerse()

  const handleStart = () => {
    console.log('Entrar clicado')
  }

  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/assets/images/homeimg1.png"
          alt="Crianca Orando"
          fill
          priority
          className="object-cover w-full h-full"
        />
      </div>

      {/* Conteúdo abaixo da imagem */}
      <div className="px-4 py-6 flex flex-col items-center">
        <TextGenerateEffect
          className="text-center text-6xl font-bold mb-4 text-[#D97706]"
          words="Bem-Vindo!"
        />

        <div className="my-6">
          <button
            onClick={handleStart}
            className={`${baloo.className} bg-[#40A099] text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition`}
          >
            <span className="text-3xl font-bold tracking-wide">
              COMEÇAR LEITURA
            </span>
          </button>
        </div>
      </div>

      {/* Exibição do versículo */}
      <TypewriterEffect
        words={[
          {
            text: loading
              ? 'Carregando versículo...'
              : error
              ? 'Erro ao carregar versículo.'
              : versiculo ?? '',
            className: 'text-[#8b5e3c] font-bold'
          }
        ]}
        className="text-center text-[22px]"
      />
    </section>
  )
}
