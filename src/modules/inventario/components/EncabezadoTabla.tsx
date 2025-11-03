import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'

interface EncabezadoTablaProps {
  sortMarca: 'asc' | 'desc' | 'none'
  sortGramos: 'asc' | 'desc' | 'none'
  setSortMarca: React.Dispatch<React.SetStateAction<'asc' | 'desc' | 'none'>>
  setSortGramos: React.Dispatch<React.SetStateAction<'asc' | 'desc' | 'none'>>
}

export default function EncabezadoTabla({
  sortMarca,
  sortGramos,
  setSortMarca,
  setSortGramos,
}: EncabezadoTablaProps) {
  const headerStyle =
    'grid grid-cols-6 gap-2 font-bold text-gray-700 pb-2 border-b-2 border-gray-400'

  const handleSortMarca = () => {
    setSortMarca(
      sortMarca === 'asc' ? 'desc' : sortMarca === 'desc' ? 'none' : 'asc'
    )
    setSortGramos('none')
  }

  const handleSortGramos = () => {
    setSortGramos(
      sortGramos === 'asc' ? 'desc' : sortGramos === 'desc' ? 'none' : 'asc'
    )
    setSortMarca('none')
  }

  return (
    <li className={headerStyle}>
      <span></span> {/* Espacio para el número de ítem */}
      <span className="flex items-center justify-center select-none">
        Nombre
      </span>
      <span className="flex items-center justify-center select-none">
        Color
      </span>
      <span
        className="flex items-center justify-center cursor-pointer select-none"
        onClick={handleSortMarca}
      >
        Tipo{' '}
        {sortMarca === 'asc' ? (
          <ArrowUp />
        ) : sortMarca === 'desc' ? (
          <ArrowDown />
        ) : null}
      </span>
      <span
        className="flex items-center justify-center cursor-pointer select-none"
        onClick={handleSortGramos}
      >
        Gramos{' '}
        {sortGramos === 'asc' ? (
          <ArrowUp />
        ) : sortGramos === 'desc' ? (
          <ArrowDown />
        ) : null}
      </span>
      <span className="flex items-center justify-center select-none">
        Acciones
      </span>
    </li>
  )
}
