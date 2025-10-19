'use client'

import { cn } from '@lib/utils'
import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'

interface Word {
  text: string
  className?: string
}

interface TypewriterProps {
  words: Word[]
  className?: string
  cursorClassName?: string
  startDelay?: number
  charDelay?: number
}

export const TypewriterEffect: React.FC<TypewriterProps> = ({
  words,
  className,
  cursorClassName,
  startDelay = 0.2,
  charDelay = 0.03
}) => {
  // transforma palavras em array de letras
  const wordsArray = words.map(word => ({
    ...word,
    text: word.text.split('')
  }))

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        'span.char',
        { opacity: 1 },
        {
          duration: 0.3,
          delay: stagger(charDelay, { startDelay }),
          ease: 'easeInOut'
        }
      )
    }
  }, [isInView, charDelay, startDelay])

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <span key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{ opacity: 0 }}
              key={`char-${index}`}
              className={cn('char inline', word.className)}
            >
              {char}
            </motion.span>
          ))}
          &nbsp; {/* espaço entre palavras */}
        </span>
      ))}
    </motion.div>
  )

  return (
    <div
      className={cn(
        'text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center',
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className={cn(
          'inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-[#8b5e3c]',
          cursorClassName
        )}
      ></motion.span>
    </div>
  )
}
