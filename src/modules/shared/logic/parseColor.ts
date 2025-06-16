/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from "../constants/creacionType";

export const parseColor = (color: any): Color => {
  return {
    id: color.id,
    nombre: color.nombre,
    valor_hex: color.valor_hex
  }
}