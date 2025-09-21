'use client'

import React, { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@lib/utils'

type TextGenerateEffectProps = {
  words: string
  className?: string
}

export const TextGenerateEffect = ({
  words,
  className
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')

  useEffect(() => {
    animate('span', { opacity: 1 }, { duration: 2, delay: stagger(0.3) })
  }, [scope.current])

  return (
    <div className={cn('font-bold', className)}>
      <div className="my-2">
        <div className="leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span key={idx} className="opacity-0">
                {word}{' '}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
