import prisma from "@/modules/shared/lib/prisma"

export async function GET() {
  const filamentos = await prisma.filamentos.findMany({
    select: {
      id: true,
      nombre: true,
      imagen: true,
      cantidad: true,
      gramos: true,
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
    }
  })
  return new Response(JSON.stringify(filamentos), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const filamento = await prisma.filamentos.create({
    data: {
      nombre: data.nombre,
      imagen: data.imagen,
      cantidad: data.cantidad,
      marca_id: data.marca_id,
      color_id: data.color_id,
    }
  }).catch((error) => {
    console.error('Error al crear el filamento:', error)
    return null
  })

  if (!filamento) {
    return new Response(JSON.stringify({ error: 'Error al crear el filamento' }), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(filamento), {
    status: 201,
  })
}