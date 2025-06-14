import prisma from "@/modules/db/prisma";

export async function GET() {
  const marcas = await prisma.marca.findMany({
    select: {
      id: true,
      nombre: true,
    }
  })
  return new Response(JSON.stringify(marcas), {
    status: 200,
  })
}

export async function POST(request: Request) {
  const data = await request.json();
  const marca = await prisma.marca.create({
    data: {
      nombre: data.nombre,
    }
  })
  return new Response(JSON.stringify(marca), {
    status: 201,
  })
}