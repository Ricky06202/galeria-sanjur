import prisma from '@/modules/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const marca = await prisma.marca.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nombre: true,
    },
  })

  if (!marca) {
    return new Response(JSON.stringify({ error: 'Marca not found' }), {
      status: 404,
    })
  }

  return new Response(JSON.stringify(marca), {
    status: 200,
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const data = await request.json()

  const marca = await prisma.marca.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
    },
  })

  return new Response(JSON.stringify(marca), {
    status: 200,
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  const marca = await prisma.marca.delete({
    where: { id: parseInt(id) },
  })

  return new Response(JSON.stringify(marca), {
    status: 200,
  })
}