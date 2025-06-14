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
  })
  return new Response(JSON.stringify(categoria), {
    status: 201,
  })
}
