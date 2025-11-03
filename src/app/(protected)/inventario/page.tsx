"use client"
import EncabezadoTabla from '@/modules/inventario/components/EncabezadoTabla'
import ItemProducto from '@/modules/inventario/components/ItemProducto'
import React, { useEffect } from 'react'
import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { Filamento } from '@/modules/shared/constants/filamentoType'


export default function Page() {
  const filamentos = useFilamentosStore((state) => state.filamentos)
  const [sortedFilamentos, setSortedFilamentos] = React.useState<Filamento[]>(filamentos)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)

  const [sortMarca, setSortMarca] = React.useState<'asc' | 'desc' | 'none'>(
    'none'
  )
  const [sortGramos, setSortGramos] = React.useState<'asc' | 'desc' | 'none'>(
    'none'
  )

  useEffect(() => {
    fetchFilamentos()
  }, [])

  useEffect(() => {
    const newSortedFilamentos = [...filamentos]
    if (sortMarca === 'asc') {
      newSortedFilamentos.sort((a, b) => a.Marca.nombre.localeCompare(b.Marca.nombre))
    } else if (sortMarca === 'desc') {
      newSortedFilamentos.sort((a, b) => b.Marca.nombre.localeCompare(a.Marca.nombre))
    }else{
      newSortedFilamentos.sort((a, b) => a.id - b.id)
    }
    if (sortGramos === 'asc') {
      newSortedFilamentos.sort((a, b) => a.gramos - b.gramos)
    } else if (sortGramos === 'desc') {
      newSortedFilamentos.sort((a, b) => b.gramos - a.gramos)
    }else{
      newSortedFilamentos.sort((a, b) => a.id - b.id)
    }
    setSortedFilamentos(newSortedFilamentos)
  }, [sortMarca, sortGramos, filamentos])

  return (
    <div className="w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <ul className="flex flex-col gap-1">
        <EncabezadoTabla 
          sortMarca={sortMarca}
          sortGramos={sortGramos}
          setSortMarca={setSortMarca}
          setSortGramos={setSortGramos}
        />
        {sortedFilamentos.map((filamento: Filamento) => (
          <ItemProducto
            key={filamento.id} // Es importante usar una 'key' única
            id={filamento.id}
            imagen={filamento.imagen}
            nombre={filamento.nombre}
            color={filamento.Color}
            marca={filamento.Marca.nombre}
            gramos={filamento.gramos}
          />
        ))}
      </ul>
    </div>
  )
}
