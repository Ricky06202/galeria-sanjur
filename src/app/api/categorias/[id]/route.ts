import prisma from '@/modules/db/prisma'
import { getIdFromRequest } from '@/modules/shared/logic/getIdFromRequest'

export async function GET(
  request: Request
) {
  const id = getIdFromRequest(request)
  const categoria = await prisma.categoria.findUnique({
    where: { id: parseInt(id) },
  })
  if (!categoria) {
    return new Response(JSON.stringify({ error: 'Categoria not found' }), {
      status: 404,
    })
  }
  return new Response(JSON.stringify(categoria), {
    status: 200,
  })
}

export async function PUT(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const data = await request.json()
  const categoria = await prisma.categoria.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
    },
  })
  return new Response(JSON.stringify(categoria), {
    status: 200,
  })
}

export async function DELETE(
  request: Request
) {
  const id = getIdFromRequest(request)
  await prisma.categoria.delete({
    where: { id: parseInt(id) },
  })
  return new Response(null, {
    status: 204,
  })
}
