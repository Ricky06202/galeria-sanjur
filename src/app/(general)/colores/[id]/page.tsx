'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Filamento } from '@/modules/shared/constants/filamentoType'

export default function page() {
  const { id } = useParams()
  const [filamento, setFilamento] = useState<Filamento | null>(null)
  useEffect(() => {
    fetch(`/api/filamentos/${id}`)
    .then(res => res.json())
    .then(data => setFilamento(data))
  }, [])
  return (
    <div>
      <h1>{filamento?.nombre}</h1>
      <p>{filamento?.cantidad}</p>
      <p>{filamento?.Marca?.nombre}</p>
      <p>{filamento?.Color?.nombre}</p>  
    </div>
  )
}
