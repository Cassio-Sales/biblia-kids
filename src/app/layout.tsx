import './globals.css'
import { Baloo_2 } from 'next/font/google'
import type { Metadata } from 'next'

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '700'] // pode ajustar pesos
})

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
      {/* aplica a fonte globalmente */}
      <body className={baloo.className}>{children}</body>
    </html>
  )
}
