import { Filamento } from '@/modules/shared/constants/filamentoType'
import React from 'react'
import { BigItemProducto } from './BigItemProducto'

interface BigProductListProps {
    sortedFilamentos: Filamento[]
}

export default function BigProductList({
    sortedFilamentos
}: BigProductListProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-1">
        {sortedFilamentos.map((filamento: Filamento) => (
          <BigItemProducto
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
