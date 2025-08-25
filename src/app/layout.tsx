import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bíblia Kids',
  description: 'Aplicativo infantil com histórias bíblicas'
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
