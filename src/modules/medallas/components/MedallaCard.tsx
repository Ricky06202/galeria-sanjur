"use client"
import { FC } from 'react'
import { Tag } from '../../shared/components/Tag'
import { Color } from '@/modules/shared/constants/creacionType'
import { parseTime } from '@/modules/shared/logic/parseTime'
import { Card } from '@/modules/shared/components/Card'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
interface IMedallaCardProps {
  id: number
  nombre: string
  imagen: string
  colores: Color[]
  categoria: string
  duracion: number
  precio: number
}

export const MedallaCard: FC<IMedallaCardProps> = ({
  id,
  nombre,
  imagen,
  colores,
  categoria,
  duracion,
  precio,
}) => {

  const redirigirPagina = () => {
    redirect(`/medallas/${id}`)
  }
  const eliminarCreacion = () => {
    fetch(`/api/creaciones/${id}`, {
      method: 'DELETE'
    })
  }

  const session = useSession()
  const isAdmin = session?.data?.user?.role === 'admin'

  return (
    <Card
      imagen={imagen}
      alt={nombre}
      titulo={nombre}
      onClickEditar={() => isAdmin && redirigirPagina()}
      onClickEliminar={() => isAdmin && eliminarCreacion()}
      isAdmin={isAdmin}
    >
      <ul className="grid grid-cols-2 grid-rows-2">
        <li className="flex justify-center items-center text-center gap-1">
          {colores.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color.valor_hex }}
              className="border-2 w-3 h-3 border-gray-700 rounded-full"
            />
          ))}
        </li>
        <li className="flex justify-center items-center">
          <Tag className="bg-blue-800 text-white">{categoria}</Tag>
        </li>
        <li className="flex justify-center items-center">
          <div>{parseTime(duracion)}</div>
        </li>
        <li className="flex justify-center items-center">
          <div>{'$' + precio}</div>
        </li>
      </ul>
    </Card>
  )
}
