export type Creacion = {
    id: number
    nombre: string
    descripcion: string
    imagen: string
    precio: number
    duracion: number
    Categoria: Categoria
    Colores: Color[]
  }

  export type Categoria = {
    id: number
    nombre: string
  }

  export type Color = {
    id: number
    nombre: string
    valor_hex: string
  }

  export type GaleriaCreacion = {
    id: number
    creaciones_id: number
    imagen: string
  }