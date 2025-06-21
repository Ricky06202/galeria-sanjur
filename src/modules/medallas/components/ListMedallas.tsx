import { FC } from 'react'
import { MedallaCard } from './MedallaCard'
import { Creacion } from '@/modules/shared/constants/creacionType'
interface IListMedallasProps {
  medallas: Creacion[]
}

export const ListMedallas: FC<IListMedallasProps> = ({ medallas }) => {
  
  return (
    <div className="flex flex-wrap p-4 justify-center gap-4">
      {medallas.map((medalla) => (
        <MedallaCard
          key={medalla.nombre}
          id={medalla.id}
          nombre={medalla.nombre}
          imagen={medalla.imagen}
          categoria={medalla.Categoria.nombre}
          duracion={medalla.duracion}
          precio={medalla.precio}
          colores={medalla.Colores}
        />
      ))}
    </div>
  )
}
