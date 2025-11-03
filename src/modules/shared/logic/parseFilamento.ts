import { Filamento } from "../constants/filamentoType";

export function parseFilamento(filamento: any): Filamento {
  return {
    id: filamento.id,
    nombre: filamento.nombre,
    imagen: filamento.imagen,
    cantidad: filamento.cantidad,
    gramos: filamento.gramos,
    Color: {
      id: filamento.Color.id,
      nombre: filamento.Color.nombre,
      valor_hex: filamento.Color.valor_hex
    },
    Marca: {
      id: filamento.Marca.id,
      nombre: filamento.Marca.nombre
    }
  }
}