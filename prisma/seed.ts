import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nombre: 'Medalla conmemorativa' },
      { nombre: 'Medalla deportiva' },
      { nombre: 'Medalla escolar' },
      { nombre: 'Medalla militar' },
      { nombre: 'Medalla personalizada' },
    ],
    skipDuplicates: true,
  });
  console.log('Categorías insertadas');
  
  await prisma.creaciones.createMany({
    data: [
      {
        nombre: 'Medalla de oro',
        descripcion: 'Medalla de oro personalizada para tu evento.',
        imagen: 'https://example.com/medalla-oro.jpg',
        duracion: 1,
        precio: 2,
        categoria_id: 1
      },
      {
        nombre: 'Medalla de plata',
        descripcion: 'Medalla de plata personalizada para tu evento.',
        imagen: 'https://example.com/medalla-plata.jpg',
        duracion: 1,
        precio: 1.5,
        categoria_id: 1
      },
      {
        nombre: 'Medalla de bronce',
        descripcion: 'Medalla de bronce personalizada para tu evento.',
        imagen: 'https://example.com/medalla-bronce.jpg',
        duracion: 1,
        precio: 1,
        categoria_id: 1
      },
      {
        nombre: 'Medalla conmemorativa',
        descripcion: 'Medalla conmemorativa personalizada para tu evento.',
        imagen: 'https://example.com/medalla-conmemorativa.jpg',
        duracion: 2,
        precio: 3,
        categoria_id: 2
      },
      {
        nombre: 'Medalla deportiva',
        descripcion: 'Medalla deportiva personalizada para tu evento.',
        imagen: 'https://example.com/medalla-deportiva.jpg',
        duracion: 1,
        precio: 2,
        categoria_id: 2
      },
      {
        nombre: 'Medalla escolar',
        descripcion: 'Medalla escolar personalizada para tu evento.',
        imagen: 'https://example.com/medalla-escolar.jpg',
        duracion: 0.75,
        precio: 1.25,
        categoria_id: 3
      },
      {
        nombre: 'Medalla militar',
        descripcion: 'Medalla militar personalizada para tu evento.',
        imagen: 'https://example.com/medalla-militar.jpg',
        duracion: 3,
        precio: 5,
        categoria_id: 4
      },
      {
        nombre: 'Medalla personalizada',
        descripcion: 'Medalla personalizada para tu evento.',
        imagen: 'https://example.com/medalla-personalizada.jpg',
        duracion: 2,
        precio: 4,
        categoria_id: 5
      },
      {
        nombre: 'Medalla de honor',
        descripcion: 'Medalla de honor personalizada para tu evento.',
        imagen: 'https://example.com/medalla-honor.jpg',
        duracion: 1.5,
        precio: 3.5,
        categoria_id: 1
      },
      {
        nombre: 'Medalla de plata con relieve',
        descripcion: 'Medalla de plata con relieve personalizada para tu evento.',
        imagen: 'https://example.com/medalla-plata-relieve.jpg',
        duracion: 1.25,
        precio: 2.25,
        categoria_id: 1
      }
    ],
    skipDuplicates: true,
  })
  console.log('Creaciones insertadas');

  await prisma.marca.createMany({
    data: [
      { nombre: 'PLA' },
      { nombre: 'ABS' },
      { nombre: 'PETG' },
      { nombre: 'ASA' },
      { nombre: 'Nylon' }
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
      { nombre: 'Negro', valor_hex: '#000000' },
      { nombre: 'Blanco', valor_hex: '#FFFFFF' },
      { nombre: 'Gris', valor_hex: '#808080' },
      { nombre: 'Naranja', valor_hex: '#FFA500' },
      { nombre: 'Violeta', valor_hex: '#800080' },
      { nombre: 'Marrón', valor_hex: '#A52A2A' }
    ],
    skipDuplicates: true,
  })
  console.log('Colores insertados');

  await prisma.filamentos.createMany({
    data: [
      {
        nombre: 'Filamento PLA Rojo',
        imagen: 'https://example.com/filamento-pla-rojo.jpg',
        cantidad: 100,
        marca_id: 1,
        color_id: 1,
      },
      {
        nombre: 'Filamento PLA Azul',
        imagen: 'https://example.com/filamento-pla-azul.jpg',
        cantidad: 200,
        marca_id: 1,
        color_id: 2,
      },
      {
        nombre: 'Filamento PLA Verde',
        imagen: 'https://example.com/filamento-pla-verde.jpg',
        cantidad: 150,
        marca_id: 1,
        color_id: 3,
      },
      {
        nombre: 'Filamento ABS Amarillo',
        imagen: 'https://example.com/filamento-abs-amarillo.jpg',
        cantidad: 80,
        marca_id: 2,
        color_id: 4,
      },
      {
        nombre: 'Filamento ABS Negro',
        imagen: 'https://example.com/filamento-abs-negro.jpg',
        cantidad: 60,
        marca_id: 2,
        color_id: 5,
      },
      {
        nombre: 'Filamento PETG Blanco',
        imagen: 'https://example.com/filamento-petg-blanco.jpg',
        cantidad: 100,
        marca_id: 3,
        color_id: 6,
      },
      {
        nombre: 'Filamento PETG Gris',
        imagen: 'https://example.com/filamento-petg-gris.jpg',
        cantidad: 200,
        marca_id: 3,
        color_id: 7,
      },
      {
        nombre: 'Filamento TPU Naranja',
        imagen: 'https://example.com/filamento-tpu-naranja.jpg',
        cantidad: 150,
        marca_id: 4,
        color_id: 8,
      },
      {
        nombre: 'Filamento TPU Violeta',
        imagen: 'https://example.com/filamento-tpu-violeta.jpg',
        cantidad: 80,
        marca_id: 4,
        color_id: 9,
      },
      {
        nombre: 'Filamento Nylon Marrón',
        imagen: 'https://example.com/filamento-nylon-marron.jpg',
        cantidad: 60,
        marca_id: 5,
        color_id: 10,
      }
    ],
    skipDuplicates: true,
  })
  console.log('Filamentos insertados');

  await prisma.creaciones_Filamentos.createMany({
    data: [
      { creaciones_id: 1, filamentos_id: 1 },
      { creaciones_id: 1, filamentos_id: 2 },
      { creaciones_id: 1, filamentos_id: 3 },
      { creaciones_id: 2, filamentos_id: 4 },
      { creaciones_id: 2, filamentos_id: 5 },
      { creaciones_id: 3, filamentos_id: 6 },
      { creaciones_id: 3, filamentos_id: 7 },
      { creaciones_id: 3, filamentos_id: 8 },
      { creaciones_id: 4, filamentos_id: 9 },
      { creaciones_id: 4, filamentos_id: 10 },
      { creaciones_id: 5, filamentos_id: 1 },
      { creaciones_id: 5, filamentos_id: 2 },
      { creaciones_id: 6, filamentos_id: 3 },
      { creaciones_id: 6, filamentos_id: 4 },
      { creaciones_id: 6, filamentos_id: 5 },
      { creaciones_id: 7, filamentos_id: 6 },
      { creaciones_id: 7, filamentos_id: 7 },
      { creaciones_id: 7, filamentos_id: 8 },
      { creaciones_id: 8, filamentos_id: 9 },
      { creaciones_id: 8, filamentos_id: 10 },
      { creaciones_id: 9, filamentos_id: 1 },
      { creaciones_id: 9, filamentos_id: 2 },
      { creaciones_id: 10, filamentos_id: 3 },
      { creaciones_id: 10, filamentos_id: 4 },
      { creaciones_id: 10, filamentos_id: 5 },
    ],
    skipDuplicates: true,
  })
  console.log('Creaciones_Filamentos insertados');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });