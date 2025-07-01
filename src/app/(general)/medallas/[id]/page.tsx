'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Creacion } from '@/modules/shared/constants/creacionType'
import { parseCreacion } from '@/modules/shared/logic/parseCreacion'
import { Filamento } from '@/modules/shared/constants/filamentoType'
import { parseFilamento } from '@/modules/shared/logic/parseFilamento'
import { ColoresCard } from '@/modules/colores/components/ColoresCard'

export default function page() {
  const { id } = useParams()
  const [creacion, setCreacion] = useState<Creacion | null>(null)
  const [filamentos, setFilamentos] = useState<Filamento[] | null>(null)
  useEffect(() => {
    fetch(`/api/creaciones/${id}`)
      .then((res) => res.json())
      .then((data) => setCreacion(parseCreacion(data)))
    fetch(`/api/creaciones_filamentos/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFilamentos(
          data.map((creaciones_filamentos: any) =>
            parseFilamento(creaciones_filamentos.Filamentos)
          )
        )
      )
  }, [])
  return (
    <div className="flex h-screen gap-4">
      <section className="flex flex-1 flex-col items-center  rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <img
            src={creacion?.imagen}
            alt={creacion?.nombre}
            className="h-48 w-48 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold">{creacion?.nombre}</h1>
          <p className="text-lg font-semibold">Precio: ${creacion?.precio}</p>
          <p className="text-lg font-semibold">Duración: {creacion?.duracion && Math.trunc(creacion?.duracion / 60) ? Math.trunc(creacion?.duracion / 60) + "h" : ""} {creacion?.duracion && (creacion?.duracion % 60) ? (creacion?.duracion % 60) + "m" : ""} {!creacion?.duracion && "No especificada"}</p>
          <p className="text-lg font-semibold">Categoria: {creacion?.Categoria?.nombre}</p>
        </div>
      </section>
      <section className="flex flex-3 flex-col items-start  rounded-2xl p-4 shadow-lg gap-4">
        <div>
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p>{creacion?.descripcion}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Colores Utilizados</h2>
          <div className="flex flex-wrap gap-4">
            {filamentos?.map((filamento: Filamento) => (
              <ColoresCard
                key={filamento.id}
                id={filamento.id}
                color={filamento.Color}
                marca={filamento.Marca?.nombre}
                nombre={filamento.nombre}
                imagen={filamento.imagen}
                cantidad={filamento.cantidad}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
