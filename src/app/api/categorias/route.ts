import prisma from '@/modules/db/prisma'

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    select: {
      id: true,
      nombre: true,
    },
  })
  return new Response(JSON.stringify(categorias), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const categoria = await prisma.categoria.create({
    data: {
      nombre: data.nombre,
    },
  }).catch((error) => {
    console.error('Error al crear la categoria:', error)
    return null
  })

  if (!categoria) {
    return new Response(JSON.stringify({ error: 'Error al crear la categoria' }), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(categoria), {
    status: 201,
  })
}
