import { Categoria } from "../constants/creacionType";

export const parseCategoria = (categoria: any): Categoria => {
  return {
    id: categoria.id,
    nombre: categoria.nombre
  }
}