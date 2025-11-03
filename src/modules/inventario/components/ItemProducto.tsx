import { Badge } from '@/modules/shared/components/ui/badge'
import { Color } from '@/modules/shared/constants/creacionType'
import { getAppropriateTextColor } from '@/modules/shared/logic/colorContrast'
import Button from '@mui/material/Button'
import { Edit, Save } from 'lucide-react'
import React from 'react'

interface ItemProductoProps {
  id: number
  imagen: string
  nombre: string
  color: Color
  marca: string
  gramos: number
}

export default function ItemProducto({
  id,
  imagen,
  nombre,
  color,
  marca,
  gramos,
}: ItemProductoProps) {
  const [editMode, setEditMode] = React.useState(false)
  const [newGramos, setNewGramos] = React.useState(gramos)

  const toggleEdit = () => {
    setEditMode(!editMode)
  }

  const handleSave = () => {
    setEditMode(false)
    fetch(`/api/filamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gramos: newGramos,
      }),
    })
  }

  const rowStyle = 'grid grid-cols-6 gap-2 py-1 border-b border-gray-200'
  return (
    <li className={rowStyle}>
      <span className="flex items-center justify-center">
        <img src={imagen} alt={nombre} width={50} height={50} />
      </span>
      <span className="flex items-center justify-center text-center">
        {nombre}
      </span>
      <span className="flex items-center justify-center">
        <Badge
          style={{
            backgroundColor: color.valor_hex,
            color: getAppropriateTextColor(color.valor_hex),
          }}
        >
          {color.nombre}
        </Badge>
      </span>
      <span className="flex items-center justify-center">{marca}</span>
      <span className="flex items-center justify-center">
        {editMode ? (
          <input
            className='border border-gray-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 ease-in-out'
            type="number"
            value={newGramos}
            onChange={(e) => setNewGramos(parseInt(e.target.value))}
          />
        ) : newGramos < 1000 ? (
          `${newGramos}g`
        ) : (
          `${Math.trunc(newGramos / 1000)}kg ${newGramos % 1000}g`
        )}
      </span>
      <span className="flex items-center justify-center">
        {editMode ? (
          <Button variant="outlined" onClick={handleSave}>
            <Save />
          </Button>
        ) : (
          <Button variant="outlined" onClick={toggleEdit}>
            <Edit />
          </Button>
        )}
      </span>
    </li>
  )
}
