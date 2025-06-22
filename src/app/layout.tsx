import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/modules/shared/components/Navbar'

export const metadata: Metadata = {
  title: 'Medallas Sanjur',
  description: 'Galeria de Medallas hechas por la Familia Sanjur',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="scroll-smooth bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-7xl mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
