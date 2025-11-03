import { Color } from "./creacionType";

export type Filamento = {
  id: number;
  nombre: string;
  imagen: string;
  cantidad: number;
  gramos: number
  Color: Color
  Marca: Marca
}

export type Marca = {
  id: number
  nombre: string
}