import prisma from '@/modules/shared/lib/prisma'

export async function GET(request: Request) {
  const galeria_creaciones = await prisma.galeria_Creaciones.findMany()
  if (!galeria_creaciones) {
    return new Response(JSON.stringify({ error: 'Galeria de creaciones no encontrada' }), {
      status: 404,
    })
  }
  return new Response(JSON.stringify(galeria_creaciones), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const galeria_creacion = await prisma.galeria_Creaciones.create({
    data: {
      creaciones_id: data.creaciones_id,
      imagen: data.imagen,
    },
  })
  return new Response(JSON.stringify(galeria_creacion), {
    status: 201,
  })
}
