import React from 'react'
import { Navbar } from '@/modules/shared/components/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
