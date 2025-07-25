import prisma from "@/modules/shared/lib/prisma"

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
  }).catch((error) => {
    console.error('Error al crear el color:', error)
    return null
  })

  if (!color) {
    return new Response(JSON.stringify({ error: 'Error al crear el color' }), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(color), { status: 201 })
}
