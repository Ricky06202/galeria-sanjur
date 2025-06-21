/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
interface ICardProps {
  children?: React.ReactNode
  imagen: string
  alt?: string
  titulo: string
  isAdmin?: boolean
  onClickEditar: () => void
  onClickEliminar: () => void
}

export const Card: FC<ICardProps> = ({
  children,
  imagen,
  alt,
  titulo,
  isAdmin = true,
  onClickEditar,
  onClickEliminar,
}) => {
  return (
    <div className="w-60 rounded-xl overflow-hidden relative shadow-lg group ">
      <div className="bg-gray-200 dark:bg-gray-700">
        <img className="w-full h-40 object-cover" src={imagen} alt={alt} />
      </div>
      <div className="flex flex-col items-center p-3 h-full bg-gray-300 dark:bg-gray-900">
        <h2 className="text-lg font-bold mb-2">{titulo}</h2>
        {children}
      </div>
      {/* Overlay for admin users */}
      {isAdmin && (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900/30 text-white px-2 py-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-10 justify-center items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white w-30 px-4 py-2 rounded cursor-pointer"
              onClick={onClickEditar}
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white w-30 px-4 py-2  rounded cursor-pointer"
              onClick={onClickEliminar}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
      {/* TODO: hacer un boton para ver la overlay de admins en movil */}
    </div>
  )
}
