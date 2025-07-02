'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Filamento } from '@/modules/shared/constants/filamentoType'
import { getAppropriateTextColor } from '@/modules/shared/logic/colorContrast'
import { parseFilamento } from '@/modules/shared/logic/parseFilamento'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Creacion } from '@/modules/shared/constants/creacionType'
import { parseCreacion } from '@/modules/shared/logic/parseCreacion'
import { MedallaCard } from '@/modules/medallas/components/MedallaCard'

export default function Page() {
  const { id } = useParams()
  const [filamento, setFilamento] = useState<Filamento | null>(null)
  const [creaciones, setCreaciones] = useState<Creacion[] | null>(null)
  useEffect(() => {
    fetch(`/api/filamentos/${id}`)
      .then((res) => res.json())
      .then((data) => setFilamento(parseFilamento(data)))
    fetch(`/api/creaciones_filamentos/${id}?filamento=true`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCreaciones(
          data.map((creaciones_filamentos: any) =>
            parseCreacion(creaciones_filamentos.Creaciones)
          )
        )
      })
  }, [])
  return (
    <div className="flex gap-4">
      <section className="flex flex-1 flex-col h-[calc(100vh-10rem)] items-center  rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <img
            src={filamento?.imagen}
            alt={filamento?.nombre}
            className="h-48 w-48 rounded-2xl object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold text-center">
            {filamento?.nombre}
          </h1>
          <p className="text-lg font-semibold">
            Cantidad: {filamento?.cantidad} rollos
          </p>
          <p className="text-lg font-semibold">
            Marca: {filamento?.Marca?.nombre}
          </p>
          <p className="text-lg font-semibold flex items-center gap-2">
            Color:
            <Badge
              style={{
                backgroundColor: filamento?.Color?.valor_hex || '#FFF',
                color: getAppropriateTextColor(
                  filamento?.Color?.valor_hex || '#000'
                ),
              }}
            >
              {filamento?.Color?.nombre}
            </Badge>
          </p>
        </div>
      </section>
      <section className="flex flex-3 flex-col h-[calc(100vh-10rem)] items-start  rounded-2xl p-4 shadow-lg gap-4">
        <h1 className="text-2xl font-bold">{filamento?.nombre}</h1>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Este color se encuentra en las siguientes creaciones</h2>
          <div className="flex flex-wrap gap-4">
            {creaciones?.map((creacion: Creacion) => (
              <MedallaCard
                key={creacion.id}
                id={creacion.id}
                colores={creacion.Colores}
                nombre={creacion.nombre}
                imagen={creacion.imagen}
                categoria={creacion.Categoria?.nombre}
                duracion={creacion.duracion}
                precio={creacion.precio}
                isDeleteDisabled
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
