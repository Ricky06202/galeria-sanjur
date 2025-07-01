import prisma from "@/modules/shared/lib/prisma"

export async function GET() {
  const creaciones = await prisma.creaciones.findMany({
    select: {
      id: true,
      nombre: true,
      imagen: true,
      duracion: true,
      precio: true,
      Categoria: {
        select: {
          id: true,
          nombre: true,
        },
      },
      Creaciones_Filamentos: {
        select: {
          Filamentos: {
            select: {
              id: true,
              Color: {
                select: {
                  id: true,
                  nombre: true,
                  valor_hex: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return new Response(JSON.stringify(creaciones), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const creacion = await prisma.creaciones.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: data.imagen,
      duracion: data.duracion,
      precio: data.precio,
      categoria_id: data.categoria_id,
    }
  }).catch((error) => {
    console.error('Error al crear la creacion:', error)
    return null
  })

  if (!creacion) {
    return new Response(JSON.stringify({ error: 'Error al crear la creacion' }), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(creacion), {
    status: 201,
  })
}
