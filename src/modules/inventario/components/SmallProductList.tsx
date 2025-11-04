import React, { Dispatch, SetStateAction } from 'react'
import EncabezadoTabla from './EncabezadoTabla'
import { Filamento } from '@/modules/shared/constants/filamentoType'
import SmallItemProducto from './SmallItemProducto'

interface SmallProductListProps {
    sortedFilamentos: Filamento[]
    sortMarca: 'asc' | 'desc' | 'none'
    sortGramos: 'asc' | 'desc' | 'none'
    setSortMarca: Dispatch<SetStateAction<'asc' | 'desc' | 'none'>>
    setSortGramos: Dispatch<SetStateAction<'asc' | 'desc' | 'none'>>
}

export default function SmallProductList({
    sortedFilamentos,
    sortMarca,
    sortGramos,
    setSortMarca,
    setSortGramos
}: SmallProductListProps) {

  return (
    <ul className="flex flex-col gap-1">
        <EncabezadoTabla
          sortMarca={sortMarca}
          sortGramos={sortGramos}
          setSortMarca={setSortMarca}
          setSortGramos={setSortGramos}
        />
        {sortedFilamentos.map((filamento: Filamento) => (
          <SmallItemProducto
            key={filamento.id} // Es importante usar una 'key' única
            id={filamento.id}
            imagen={filamento.imagen}
            nombre={filamento.nombre}
            color={filamento.Color}
            marca={filamento.Marca?.nombre}
            gramos={filamento.gramos}
          />
        ))}
      </ul>
  )
}
