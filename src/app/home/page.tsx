'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Home } from './Home'

// prevents the user from navigating back to intro page
export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/home') // garante que sempre esteja na home

    const handlePopState = (): void => {
      router.replace('/home')
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white">
      <Home />
    </div>
  )
}
