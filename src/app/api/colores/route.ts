import prisma from '@/modules/db/prisma'

export async function GET() {
  const colores = await prisma.color.findMany({
    select: {
      id: true,
      nombre: true,
      valor_hex: true,
    },
  })
  return new Response(JSON.stringify(colores), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const color = await prisma.color.create({
    data: {
      nombre: data.nombre,
      valor_hex: data.valor_hex,
    },
  })
  return new Response(JSON.stringify(color), { status: 201 })
}
