import { useEffect } from 'react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      // Faz um type guard: garante que o target é um elemento HTML real
      const target = event.target as HTMLElement | null
      if (!target) return

      if (!target.closest('.scrollable')) {
        event.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
