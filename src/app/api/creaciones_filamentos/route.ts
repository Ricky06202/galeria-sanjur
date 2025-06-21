import prisma from '@/modules/db/prisma'

export async function GET() {
  const creacionesFilamentos = await prisma.creaciones_Filamentos.findMany({
    select: {
      creaciones_id: true,
      filamentos_id: true,
    },
  })
  return new Response(JSON.stringify(creacionesFilamentos), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  const creacionFilamento = await prisma.creaciones_Filamentos.create({
    data: {
      creaciones_id: data.creaciones_id,
      filamentos_id: data.filamentos_id,
    }
  }).catch((error) => {
    console.error('Error al agregar el filamento a la creacion:', error)
    return null
  })

  if (!creacionFilamento) {
    return new Response(JSON.stringify({ error: 'Error al agregar el filamento a la creacion' }), {
      status: 500,
    })
  }
  return new Response(JSON.stringify(creacionFilamento), {
    status: 201,
  })
}
