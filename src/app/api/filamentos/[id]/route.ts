import prisma from "@/modules/db/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const filamento = await prisma.filamentos.findUnique({
    where: { id: parseInt(id) },
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
  })

  if (!filamento) {
    return new Response(
      JSON.stringify({ error: 'Filamento not found' }),
      {
        status: 404,
      }
    )
  }

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await request.json();
  
  const filamento = await prisma.filamentos.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      imagen: data.imagen,
      cantidad: data.cantidad,
      marca_id: data.marca_id,
      color_id: data.color_id,
    },
  })

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  
  const filamento = await prisma.filamentos.delete({
    where: { id: parseInt(id) },
  })

  return new Response(JSON.stringify(filamento), {
    status: 200,
  })
}