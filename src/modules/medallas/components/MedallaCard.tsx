"use client"
import { FC } from 'react'
import { Color } from '@/modules/shared/constants/creacionType'
import { parseTime } from '@/modules/shared/logic/parseTime'
import { Card } from '@/modules/shared/components/Card'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Badge } from '@/modules/shared/components/ui/badge'
import { useCreacionesStore } from '../stores/creacionesStore'
interface IMedallaCardProps {
  id: number
  nombre: string
  imagen: string
  colores: Color[]
  categoria: string
  duracion: number
  precio: number
  isDeleteDisabled?: boolean
}

export const MedallaCard: FC<IMedallaCardProps> = ({
  id,
  nombre,
  imagen,
  colores,
  categoria,
  duracion,
  precio,
  isDeleteDisabled = false
}) => {

  const deleteCreacion = useCreacionesStore((state) => state.deleteCreacion)

  const redirigirPagina = () => {
    redirect(`/medallas/editar/${id}`)
  }
  const eliminarCreacion = () => {
    deleteCreacion(id)
  }

  const verDetalles = () => {
    redirect(`/medallas/${id}`)
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
      onClickVerDetalles={verDetalles}
      isAdmin={isAdmin}
      isDeleteDisabled={isDeleteDisabled}
    >
      <ul className="grid grid-cols-2 grid-rows-2">
        <li className="flex justify-center items-center text-center gap-1 h-10">
          {colores.map((color, index) => (
            <Badge
              key={index}
              style={{ backgroundColor: color.valor_hex }}
              className="border w-3 h-3 border-black"
            />
          ))}
        </li>
        <li className="flex justify-center items-center">
          <Badge className='text-wrap! text-center'>{categoria}</Badge>
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
