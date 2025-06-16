import prisma from '@/modules/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
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
  { params }: { params: { id: string } }
) {
  const { id } = await params
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
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const color = await prisma.color.delete({
    where: { id: parseInt(id) },
  })
  return new Response(JSON.stringify(color), { status: 200 })
}
