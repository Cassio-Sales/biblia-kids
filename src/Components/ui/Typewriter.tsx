'use client'

import React, { useEffect, useState } from 'react'

type TypewriterEffectProps = {
  text: string
  className?: string
  speed?: number
}

export const TypewriterEffect = ({
  text,
  className = '',
  speed = 50
}: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!text) return

    setDisplayedText('') // reinicia sempre que mudar o texto
    let index = 0

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text.charAt(index))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <p className={`font-bold leading-snug tracking-wide ${className}`}>
      {displayedText}
    </p>
  )
}
