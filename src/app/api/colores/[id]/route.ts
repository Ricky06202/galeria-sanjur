import prisma from "@/modules/shared/lib/prisma"
import { getIdFromRequest } from '@/modules/shared/logic/getIdFromRequest'

export async function GET(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const color = await prisma.color.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nombre: true,
      valor_hex: true,
    },
  })
  if (!color)
    return new Response(JSON.stringify({ error: 'Color not found' }), {
      status: 404,
    })
  return new Response(JSON.stringify(color), { status: 200 })
}

export async function PUT(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const data = await request.json()
  const color = await prisma.color.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      valor_hex: data.valor_hex,
    },
  })
  return new Response(JSON.stringify(color), { status: 200 })
}

export async function DELETE(
  request: Request,
) {
  const id = getIdFromRequest(request)
  const color = await prisma.color.delete({
    where: { id: parseInt(id) },
  })
  return new Response(JSON.stringify(color), { status: 200 })
}
