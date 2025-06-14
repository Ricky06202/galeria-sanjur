import prisma from "@/modules/db/prisma";

export async function GET(request: Request, { params}: {params: {id:string}}) {
  const {id} = await params;
  const creacion = await prisma.creaciones.findUnique({
    where: {
      id: parseInt(id),
    },
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
    }
  });
  if (!creacion) {
    return new Response(JSON.stringify({ error: "Creacion not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(creacion), {
    status: 200,
  });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await request.json();
  const creacion = await prisma.creaciones.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      imagen: data.imagen,
      duracion: data.duracion,
      precio: data.precio,
      categoria_id: data.categoria_id,
    },
  });
  return new Response(JSON.stringify(creacion), {
    status: 200,
  });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  await prisma.creaciones.delete({
    where: { id: parseInt(id) },
  });
  return new Response(null, {
    status: 204,
  });
}
