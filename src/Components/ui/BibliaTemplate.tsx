'use client'

import { TextGenerateEffect } from "./TextGenerateEffect"
import Image from "next/image"
import { Baloo_2 } from 'next/font/google'

const BibliaTemplate = () => {
  return (
    <section className="w-full flex flex-col items-center">
      
      <div className="px-4 py-6 flex flex-col items-center">
        <TextGenerateEffect
          className="text-center text-6xl font-bold mb-4 text-[#D97706]"
          words="Versículo do Dia"
        />
      </div>

      <div className="relative w-full h-[70vh] overflow-hidden">
              <Image
                src="/assets/images/bibliatemplate.png"
                alt="Biblia"
                fill
                priority
                className="object-cover w-full h-full"
              />
            </div>
    </section>
  )
}

export default BibliaTemplate
