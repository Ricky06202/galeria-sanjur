import React from 'react'
import { Navbar } from '@/modules/shared/components/Navbar'
import { Toaster } from '@/modules/shared/components/ui/sonner'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster position="top-center" />
    </div>
  )
}
