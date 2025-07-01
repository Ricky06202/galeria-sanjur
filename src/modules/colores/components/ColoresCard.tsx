"use client"
import { Card } from '@/modules/shared/components/Card'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Color } from '@/modules/shared/constants/creacionType'
import { getAppropriateTextColor } from '@/modules/shared/logic/colorContrast'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'
interface IColoresCardProps {
  id: number
  nombre: string
  imagen: string
  color: Color
  marca: string
  cantidad: number
}

export const ColoresCard: FC<IColoresCardProps> = ({
  id,
  nombre,
  imagen,
  color,
  marca,
  cantidad,
}) => {
  const editarFilamento = () => {
    redirect(`/colores/editar/${id}`)
  }
  const eliminarFilamento = () => {
    fetch(`/api/filamentos/${id}`, {
      method: 'DELETE',
    })
  }

  const verDetalles = () => {
    redirect(`/colores/${id}`)
  }

  const session = useSession()
  const isAdmin = session?.data?.user?.role === 'admin'

  return (
    <Card
      imagen={imagen}
      alt={nombre}
      titulo={nombre}
      onClickEditar={() => isAdmin && editarFilamento()}
      onClickEliminar={() => isAdmin && eliminarFilamento()}
      onClickVerDetalles={verDetalles}
      isAdmin={isAdmin}
    >
      <ul className="grid grid-cols-2 grid-rows-2">
        <li className="flex justify-center items-center text-center">
          <Badge style={{ backgroundColor: color.valor_hex, color: getAppropriateTextColor(color.valor_hex) }}>
            {color.nombre}
          </Badge>
        </li>
        <li className="flex justify-center items-center">
          <Badge >{marca}</Badge>
        </li>
        <li className="col-span-2 flex justify-center items-center">
          <div>{cantidad + ' Rollos Disponibles'}</div>
        </li>
      </ul>
    </Card>
  )
}
