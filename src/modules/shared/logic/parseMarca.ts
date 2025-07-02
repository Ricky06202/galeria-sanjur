import { Marca } from "../constants/filamentoType";

export const parseMarca = (marca: any): Marca => {
  return {
    id: marca.id,
    nombre: marca.nombre,
  }
}