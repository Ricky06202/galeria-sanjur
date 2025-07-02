import prisma from '@/modules/shared/lib/prisma'
import { getIdFromRequest } from '@/modules/shared/logic/getIdFromRequest'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request)
  const getByFilamento = request.nextUrl.searchParams.get('filamento')
  if (!getByFilamento) {
    const Filamentos = await prisma.creaciones_Filamentos.findMany({
      where: {
        creaciones_id: parseInt(id),
      },
      select: {
        Filamentos: {
          include: {
            Marca: true,
            Color: true,
          },
        },
      },
    })

    if (!Filamentos) {
      return new Response(
        JSON.stringify({ error: 'Creacion Filamento not found' }),
        {
          status: 404,
        }
      )
    }

    return new Response(JSON.stringify(Filamentos), {
      status: 200,
    })
  } else {
    const Creaciones = await prisma.creaciones_Filamentos.findMany({
      where: {
        filamentos_id: parseInt(id),
      },
      select: {
        Creaciones: {
          include: {
            Categoria: true,
            Creaciones_Filamentos: {
              include: {
                Filamentos: {
                  include: {
                    Color: true,
                    Marca: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!Creaciones) {
      return new Response(
        JSON.stringify({ error: 'Creacion Filamento not found' }),
        {
          status: 404,
        }
      )
    }

    return new Response(JSON.stringify(Creaciones), {
      status: 200,
    })
  }
}

export async function POST(request: Request) {
  const id = getIdFromRequest(request)
  const data = await request.json()
  const creacionFilamento = await prisma.creaciones_Filamentos
    .create({
      data: {
        creaciones_id: parseInt(id),
        filamentos_id: data.filamentos_id,
      },
    })
    .catch((error) => {
      console.error('Error al agregar el filamento a la creacion:', error)
      return null
    })

  if (!creacionFilamento) {
    return new Response(
      JSON.stringify({ error: 'Error al agregar el filamento a la creacion' }),
      {
        status: 500,
      }
    )
  }

  return new Response(JSON.stringify(creacionFilamento), {
    status: 201,
  })
}

export async function PUT(request: Request) {
  const id = getIdFromRequest(request)
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

export async function DELETE(request: Request) {
  const id = getIdFromRequest(request)
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
