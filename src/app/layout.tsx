import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bíblia Kids',
  description: 'Aplicativo infantil com histórias bíblicas',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bíblia Kids'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
