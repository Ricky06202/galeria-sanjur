import prisma from '@/modules/db/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const creacionFilamento = await prisma.creaciones_Filamentos.findMany({
    where: {
      creaciones_id: parseInt(id),
    },
    select: {
      creaciones_id: true,
      filamentos_id: true,
      Filamentos: {
        select: {
          id: true,
          nombre: true,
          imagen: true,
          cantidad: true,
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
        },
      },
    },
  })

  if (!creacionFilamento) {
    return new Response(
      JSON.stringify({ error: 'Creacion Filamento not found' }),
      {
        status: 404,
      }
    )
  }

  return new Response(JSON.stringify(creacionFilamento), {
    status: 200,
  })
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const data = await request.json()
  const creacionFilamento = await prisma.creaciones_Filamentos.create({
    data: {
      creaciones_id: parseInt(id),
      filamentos_id: data.filamentos_id,
    },
  })

  return new Response(JSON.stringify(creacionFilamento), {
    status: 201,
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const data = await request.json()
  const creacionFilamento = await prisma.creaciones_Filamentos.update({
    where: {
      creaciones_id_filamentos_id: {
        creaciones_id: parseInt(id),
        filamentos_id: data.filamentos_id,
      },
    },
    data: {
      filamentos_id: data.filamentos_id,
    },
  })

  return new Response(JSON.stringify(creacionFilamento), {
    status: 200,
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const data = await request.json()
  const creacionFilamento = await prisma.creaciones_Filamentos.delete({
    where: {
      creaciones_id_filamentos_id: {
        creaciones_id: parseInt(id),
        filamentos_id: data.filamentos_id,
      },
    },
  })

  return new Response(JSON.stringify(creacionFilamento), {
    status: 200,
  })
}
