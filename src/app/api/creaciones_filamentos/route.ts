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
  })
  return new Response(JSON.stringify(creacionFilamento), {
    status: 201,
  })
}
