import prisma from '@/modules/db/prisma'
import { getIdFromRequest } from '@/modules/shared/logic/getIdFromRequest'

export async function GET(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const filamento = await prisma.filamentos.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nombre: true,
      imagen: true,
      cantidad: true,
      Marca: {
        select: {
          id: true,
          nombre: true,
        },
      },
      Color: {
        select: {
          id: true,
          nombre: true,
          valor_hex: true,
        },
      },
    },
  })

  if (!filamento) {
    return new Response(JSON.stringify({ error: 'Filamento not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}

export async function PUT(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const data = await request.json()

  const filamento = await prisma.filamentos.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      imagen: data.imagen,
      cantidad: data.cantidad,
      marca_id: data.marca_id,
      color_id: data.color_id,
    },
  })

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}

export async function DELETE(
  request: Request,
) {
  const id = getIdFromRequest(request)

  const filamento = await prisma.filamentos.delete({
    where: { id: parseInt(id) },
  })

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}
