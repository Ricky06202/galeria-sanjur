import prisma from '@/modules/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
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
  { params }: { params: { id: string } }
) {
  const { id } = await params
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
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  await prisma.categoria.delete({
    where: { id: parseInt(id) },
  })
  return new Response(null, {
    status: 204,
  })
}
