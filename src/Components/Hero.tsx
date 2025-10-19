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
      {/* Imagem superior com botão */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/assets/images/homeimg1.png"
          alt="Criança Orando"
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

      {/* Seção da Bíblia com título e versículo */}
      <div className="relative w-full h-[70vh] overflow-hidden flex flex-col items-center justify-center">
        <Image
          src="/assets/images/bibliatemplate.png"
          alt="Bíblia aberta"
          fill
          priority
          className="object-cover w-full h-full scale-125 object-center"
        />

        {/* Texto sobreposto */}
        <div className="absolute flex flex-col items-center text-center px-6 w-full h-full justify-center">
          {/* Título centralizado no meio */}
          <TextGenerateEffect
            className="text-4xl font-bold text-[#8b5e3c] mb-6"
            words="Versículo do Dia"
          />

          <TypewriterEffect
            words={[
              {
                text: loading
                  ? 'Carregando versículo...'
                  : error
                  ? 'Erro ao carregar versículo.'
                  : versiculo ?? '',
                className: 'text-[#8b5e3c] font-bold drop-shadow-lg'
              }
            ]}
            className="text-center text-2xl sm:text-2xl md:text-3xl lg:text-3xl max-w-[65%] leading-snug break-words text-balance mx-auto"
          />
        </div>
      </div>
    </section>
  )
}
