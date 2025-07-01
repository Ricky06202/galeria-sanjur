import { Creacion } from "../constants/creacionType"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCreacion = (creacion: any): Creacion => {
  return {
    id: creacion.id,
    nombre: creacion.nombre,
    descripcion: creacion.descripcion,
    imagen: creacion.imagen,
    precio: creacion.precio,
    duracion: creacion.duracion,
    Categoria: {
      id: creacion.Categoria.id,
      nombre: creacion.Categoria.nombre,
    },
    Colores: creacion.Creaciones_Filamentos.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (creacion_filamento: any) => ({
        id: creacion_filamento.Filamentos.Color.id,
        nombre: creacion_filamento.Filamentos.Color.nombre,
        valor_hex: creacion_filamento.Filamentos.Color.valor_hex,
      })
    ),
  }
}
