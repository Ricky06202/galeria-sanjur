import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Medallas Sanjur',
  description: 'Galeria de Medallas hechas por la Familia Sanjur',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="flex flex-col w-full min-h-screen scroll-smooth bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <SessionProvider>
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
