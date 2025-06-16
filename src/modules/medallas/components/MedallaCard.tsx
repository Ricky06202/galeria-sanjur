import { FC } from 'react'
import { Tag } from '../../shared/components/Tag'
import { Color } from '@/modules/shared/constants/creacionType'
import { parseTime } from '@/modules/shared/logic/parseTime'
interface IMedallaCardProps {
  imagen: string
  nombre: string
  colores: Color[]
  categoria: string
  duracion: number
  precio: number
}

export const MedallaCard: FC<IMedallaCardProps> = ({
  imagen,
  nombre,
  colores,
  categoria,
  duracion,
  precio,
}) => {
  return (
    <div className="w-60 rounded-xl overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700">
        <img className="w-full h-40 object-cover" src={imagen} alt={nombre} />
      </div>
      <div className="flex flex-col items-center p-3 h-full bg-gray-300 dark:bg-gray-900">
        <h2 className="text-lg font-bold mb-2">{nombre}</h2>
        <ul className="grid grid-cols-2 grid-rows-2">
          <li className="flex justify-center items-center text-center gap-1">
            {colores.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color.valor_hex }}
                className='border-2 w-3 h-3 border-gray-700 rounded-full'
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
      </div>
    </div>
  )
}
