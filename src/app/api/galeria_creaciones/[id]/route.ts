import prisma from '@/modules/shared/lib/prisma'
import { getIdFromRequest } from '@/modules/shared/logic/getIdFromRequest'

export async function GET(request: Request) {
  const id = getIdFromRequest(request)
  const galeria_creacion = await prisma.galeria_Creaciones.findMany({
    where: {
      creaciones_id: parseInt(id),
    },
  })
  if (!galeria_creacion) {
    return new Response(
      JSON.stringify({ error: 'Galeria de creacion no encontrada' }),
      {
        status: 404,
      }
    )
  }
  return new Response(JSON.stringify(galeria_creacion), {
    status: 200,
  })
}

export async function DELETE(request: Request) {
  const id = getIdFromRequest(request)
  const galeria_creacion = await prisma.galeria_Creaciones.delete({
    where: {
      id: parseInt(id),
    },
  })
  if (!galeria_creacion) {
    return new Response(
      JSON.stringify({ error: 'Galeria de creacion no encontrada' }),
      {
        status: 404,
      }
    )
  }
  return new Response(JSON.stringify(galeria_creacion), {
    status: 200,
  })
}

export async function PUT(request: Request) {
  const id = getIdFromRequest(request)
  const data = await request.json()
  const galeria_creacion = await prisma.galeria_Creaciones.update({
    where: {
      id: parseInt(id),
    },
    data: {
      creaciones_id: data.creaciones_id,
      imagen: data.imagen,
    },
  })
  if (!galeria_creacion) {
    return new Response(
      JSON.stringify({ error: 'Galeria de creacion no encontrada' }),
      {
        status: 404,
      }
    )
  }
  return new Response(JSON.stringify(galeria_creacion), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const id = getIdFromRequest(request)
  const data = await request.json()
  const galeria_creacion = await prisma.galeria_Creaciones.create({
    data: {
      creaciones_id: parseInt(id),
      imagen: data.imagen,
    },
  })
  return new Response(JSON.stringify(galeria_creacion), {
    status: 201,
  })
}
