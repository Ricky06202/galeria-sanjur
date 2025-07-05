'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Creacion, GaleriaCreacion } from '@/modules/shared/constants/creacionType'
import { parseCreacion } from '@/modules/shared/logic/parseCreacion'
import { Filamento } from '@/modules/shared/constants/filamentoType'
import { parseFilamento } from '@/modules/shared/logic/parseFilamento'
import { ColoresCard } from '@/modules/colores/components/ColoresCard'

import { Card, CardContent } from "@/modules/shared/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/modules/shared/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { parseGaleriaCreacion } from '@/modules/shared/logic/parseGaleriaCreacion'

export default function Page() {
  const { id } = useParams()
  const [creacion, setCreacion] = useState<Creacion | null>(null)
  const [filamentos, setFilamentos] = useState<Filamento[] | null>(null)
  const [galeriaCreaciones, setGaleriaCreaciones] = useState<GaleriaCreacion[] | null>(null)
  useEffect(() => {
    fetch(`/api/creaciones/${id}`)
      .then((res) => res.json())
      .then((data) => setCreacion(parseCreacion(data)))
    fetch(`/api/creaciones_filamentos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setFilamentos(
          data.map((creaciones_filamentos: any) =>
            parseFilamento(creaciones_filamentos.Filamentos)
          )
        )
      })
      fetch(`/api/galeria_creaciones/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGaleriaCreaciones(
          data.map((galeria_creaciones: any) =>
            parseGaleriaCreacion(galeria_creaciones)
          )
        )
      })
  }, [])

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="flex gap-4 h-full flex-col lg:flex-row">
      <section className="flex flex-1 flex-col min-h-full items-center  rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <img
            src={creacion?.imagen}
            alt={creacion?.nombre}
            className="h-48 w-48 rounded-2xl object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold text-center">{creacion?.nombre}</h1>
          <p className="text-lg font-semibold">Precio: ${creacion?.precio}</p>
          <p className="text-lg font-semibold">
            Duración:{' '}
            {creacion?.duracion && Math.trunc(creacion?.duracion / 60)
              ? Math.trunc(creacion?.duracion / 60) + 'h'
              : ''}{' '}
            {creacion?.duracion && creacion?.duracion % 60
              ? (creacion?.duracion % 60) + 'm'
              : ''}{' '}
            {!creacion?.duracion && 'No especificada'}
          </p>
          <p className="text-lg font-semibold text-center">
            Categoria: {creacion?.Categoria?.nombre}
          </p>
        </div>
      </section>
      <section className="flex flex-3 flex-col min-h-full items-start  rounded-2xl p-4 shadow-lg gap-4">
        <h1 className="text-2xl font-bold">{creacion?.nombre}</h1>
        <div>
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p>{creacion?.descripcion}</p>
        </div>
        <div className="flex flex-col w-full items-center">
          <h2 className="text-lg font-semibold w-full">Galeria de fotos</h2>
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-[calc(100%-8rem)] "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {galeriaCreaciones?.map((galeria_creacion: GaleriaCreacion) => (
                <CarouselItem key={galeria_creacion.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 ">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-4 relative">
                        <img src={galeria_creacion.imagen} alt={galeria_creacion.id.toString()} className="w-full h-full object-cover " />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold z-10">
                          {galeria_creacion.id}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
                isDeleteDisabled
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
