'use client'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'

import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { TypewriterEffect } from './ui/Typewriter'
import { Baloo_2 } from 'next/font/google'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['700'] })

const Hero = () => {
  const [versiculo, setVersiculo] = useState('')

  const handleStart = () => {
    console.log('Entrar clicado')
  }

  useEffect(() => {
    const fetchVersiculo = async () => {
      const apiKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY
      const BIBLE_ID = '941380703fcb500c-01'

      const VERSES = [
        'GEN.1.1',
        'PSA.23.1',
        'PHP.4.13',
        'JHN.3.16',
        'EPH.6.1',
        'COL.3.20',
        'MAT.19.14',
        'PRO.22.6',
        'PSA.56.3',
        'ISA.41.10',
        'JOS.1.9',
        'MAT.5.9',
        'PSA.100.1',
        '1COR.13.4',
        'GAL.5.22',
        'ROM.12.10',
        'HEB.13.16',
        '1TH.5.16',
        '1TH.5.17',
        'PRO.3.5',
        'MAT.7.12',
        'LUK.6.31',
        'PSA.139.14',
        'ROM.8.28',
        'ISA.40.31',
        'JHN.8.12',
        'PSA.46.1',
        'MAT.11.28',
        'PSA.118.24',
        'PRO.17.17'
      ]

      const verseIndex = new Date().getDate() % VERSES.length
      const verseID = VERSES[verseIndex]

      const url = `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${verseID}?content-type=text`

      try {
        const response = await fetch(url, {
          headers: { 'api-key': apiKey || '' }
        })

        const result = await response.json()
        console.log('🔍 Retorno da API:', result)

        if (result?.data?.content) {
          let texto = result.data.content

          // 🧹 Remove trecho entre colchetes (ex: [5], [Selá])
          const indexColchete = texto.indexOf(']')
          if (indexColchete !== -1) {
            texto = texto.slice(indexColchete + 1).trim()
          }

          // 🧽 Remove aspas duplas e aspas tipográficas (“ ”)
          texto = texto.replace(/[“”"]/g, '').trim()

          // 🧼 Remove ; ou . no final, se existir
          texto = texto.replace(/[;.\s]+$/, '').trim()

          // ➕ Adiciona ponto final se o texto não tiver pontuação
          if (!/[.!?]$/.test(texto)) {
            texto += '.'
          }

          // 🧾 Exibe no formato padrão: "Livro capítulo:versículo - texto."
          setVersiculo(`${result.data.reference} - ${texto}`)
        } else {
          console.warn('Versículo não encontrado:', result)
          setVersiculo('Não foi possível carregar o versículo de hoje.')
        }
      } catch (error) {
        console.error('Erro ao buscar versículo:', error)
        setVersiculo('Erro ao carregar o versículo.')
      }
    }

    fetchVersiculo()
  }, [])



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

      {/* Conteúdo abaixo da imagem sem corte */}
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

      {/* <div className="w-screen overflow-hidden my-6">
        <video
          src="/assets/videos/jesus2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-screen h-auto object-fit "
        />
      </div> */}

      <TypewriterEffect
  words={[
    {
      text: versiculo || 'Carregando versículo...',
      className: 'text-[#40A099] font-bold'
    }
  ]}
  className="text-center text-2xl"
/>

    </section>
  )
}

export default Hero
