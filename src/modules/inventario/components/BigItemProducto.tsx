"use client"

import { Badge } from '@/modules/shared/components/ui/badge'
import { Color } from '@/modules/shared/constants/creacionType'
import { getAppropriateTextColor } from '@/modules/shared/logic/colorContrast'
import { FC, useState } from 'react'

interface BigItemProductoProps {
  id: number
  imagen: string
  nombre: string
  color: Color
  marca: string
  gramos: number
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="w-52 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg flex-shrink-0 m-1">
    {children}
  </div>
)

export const BigItemProducto: FC<BigItemProductoProps> = ({
  id,
  imagen,
  nombre,
  color,
  marca,
  gramos,
}) => {
  const [currentGramos, setCurrentGramos] = useState(gramos)
  const [editMode, setEditMode] = useState(false)

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/filamentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gramos: currentGramos,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar los gramos')
      }
      
      setEditMode(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const formatGramos = (grams: number) => {
    if (grams < 1000) {
      return `${grams}g`
    }
    const kg = Math.floor(grams / 1000)
    const remainingGrams = grams % 1000
    return `${kg}kg ${remainingGrams > 0 ? `${remainingGrams}g` : ''}`.trim()
  }

  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="relative w-full pt-[60%]"> {/* Slightly shorter image */}
          <div className="absolute inset-0">
            <img
              src={imagen}
              alt={nombre}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-3 flex-1 flex flex-col min-h-[140px]">
          <h3 className="text-base font-semibold text-gray-800 text-center mb-1 line-clamp-2 h-10 flex items-center justify-center">
            {nombre}
          </h3>
          
          <div className="flex justify-center mb-1">
            <Badge 
              style={{ 
                backgroundColor: color.valor_hex, 
                color: getAppropriateTextColor(color.valor_hex),
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                margin: '0.25rem 0'
              }}
              className="text-center"
            >
              {color.nombre}
            </Badge>
          </div>
          
          <div className="text-center text-xs text-gray-600 mb-2">
            {marca}
          </div>

          <div className="mt-auto">
            {editMode ? (
              <div className="flex flex-col items-center gap-3">
                <input
                  type="number"
                  value={currentGramos}
                  onChange={(e) => setCurrentGramos(Number(e.target.value))}
                  className="w-full max-w-[150px] text-center border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  min="0"
                  step="1"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setCurrentGramos(gramos)
                      setEditMode(false)
                    }}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {formatGramos(currentGramos)}
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Editar cantidad
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
