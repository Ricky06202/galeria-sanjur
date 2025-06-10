import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nombre: 'Pintura' },
      { nombre: 'Escultura' },
      { nombre: 'Fotografía' },
      { nombre: 'Dibujo' },
      { nombre: 'Cerámica' },
    ],
    skipDuplicates: true,
  });
  console.log('Categorías insertadas');
  
  await prisma.creaciones.createMany({
    data: [
      {
        nombre: 'La noche estrellada',
        imagen: 'https://example.com/la-noche-estrellada.jpg',
        duracion: 120,
        precio: 1500,
        categoria_id: 1
      },
      {
        nombre: 'El pensador',
        imagen: 'https://example.com/el-pensador.jpg',
        duracion: 90,
        precio: 2000,
        categoria_id: 2
      },
      {
        nombre: 'La cámara oscura',
        imagen: 'https://example.com/la-camara-oscura.jpg',
        duracion: 60,
        precio: 800,
        categoria_id: 3
      },
      {
        nombre: 'El beso',
        imagen: 'https://example.com/el-beso.jpg',
        duracion: 75,
        precio: 1200,
        categoria_id: 4
      },
      {
        nombre: 'Vaso de cerámica',
        imagen: 'https://example.com/vaso-ceramica.jpg',
        duracion: 45,
        precio: 500,
        categoria_id: 5
      }
    ],
    skipDuplicates: true,
  })
  console.log('Creaciones insertadas');

  await prisma.marca.createMany({
    data: [
      { nombre: 'Marca A' },
      { nombre: 'Marca B' },
      { nombre: 'Marca C' },
      { nombre: 'Marca D' },
      { nombre: 'Marca E' }
    ],
    skipDuplicates: true,
  })
  console.log('Marcas insertadas');

  await prisma.color.createMany({
    data: [
      { nombre: 'Rojo', valor_hex: '#FF0000' },
      { nombre: 'Azul', valor_hex: '#0000FF' },
      { nombre: 'Verde', valor_hex: '#00FF00' },
      { nombre: 'Amarillo', valor_hex: '#FFFF00' },
      { nombre: 'Negro', valor_hex: '#000000' }
    ],
    skipDuplicates: true,
  })
  console.log('Colores insertados');

  await prisma.filamentos.createMany({
    data: [
      {
        nombre: 'Filamento PLA',
        imagen: 'https://example.com/filamento-pla.jpg',
        cantidad: 100,
        marca_id: 1,
        color_id: 1,
      },
      {
        nombre: 'Filamento ABS',
        imagen: 'https://example.com/filamento-abs.jpg',
        cantidad: 200,
        marca_id: 2,
        color_id: 2,
      },
      {
        nombre: 'Filamento PETG',
        imagen: 'https://example.com/filamento-petg.jpg',
        cantidad: 150,
        marca_id: 3,
        color_id: 3,
      },
      {
        nombre: 'Filamento TPU',
        imagen: 'https://example.com/filamento-tpu.jpg',
        cantidad: 80,
        marca_id: 4,
        color_id: 4,
      },
      {
        nombre: 'Filamento Nylon',
        imagen: 'https://example.com/filamento-nylon.jpg',
        cantidad: 60,
        marca_id: 5,
        color_id: 5,
      }
    ],
    skipDuplicates: true,
  })
  console.log('Filamentos insertados');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });