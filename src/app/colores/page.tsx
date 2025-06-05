import { ColoresCard } from "@/modules/colores/ColoresCard";
import { Dropdown } from "@/modules/shared/components/Dropdown";
import { SearchBar } from "@/modules/shared/components/SearchBar";
import { FC } from "react";

const colores = [
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-circuit-green-739953-es.jpg",
    color: { texto: "Verde", valor: "#008000" },
    marca: "PLA",
    cantidad: 10,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-red-610703-es.jpg",
    color: { texto: "Rojo", valor: "#FF0000" },
    marca: "PLA",
    cantidad: 5,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-blue-610706-es.jpg",
    color: { texto: "Azul", valor: "#0000FF" },
    marca: "PLA",
    cantidad: 12,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-yellow-610707-es.jpg",
    color: { texto: "Amarillo", valor: "#FFFF00" },
    marca: "PLA",
    cantidad: 8,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-purple-610708-es.jpg",
    color: { texto: "Violeta", valor: "#800080" },
    marca: "PLA",
    cantidad: 3,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-orange-610709-es.jpg",
    color: { texto: "Naranja", valor: "#FFA500" },
    marca: "PLA",
    cantidad: 7,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-pink-610710-es.jpg",
    color: { texto: "Rosa", valor: "#FFC0CB" },
    marca: "PLA",
    cantidad: 6,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-brown-610711-es.jpg",
    color: { texto: "Marrón", valor: "#A52A2A" },
    marca: "PLA",
    cantidad: 9,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-black-610712-es.jpg",
    color: { texto: "Negro", valor: "#000000" },
    marca: "PLA",
    cantidad: 15,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-white-610713-es.jpg",
    color: { texto: "Blanco", valor: "#FFFFFF" },
    marca: "PLA",
    cantidad: 20,
  },
  {
    imagen:
      "https://3d.nice-cdn.com/upload/image/product/large/default/the-filament-pla-gray-610714-es.jpg",
    color: { texto: "Gris", valor: "#808080" },
    marca: "PLA",
    cantidad: 18,
  },

];

export const MedallasPage: FC = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 gap-4">
        <SearchBar placeholder="Busca algo!" />
        <Dropdown
          title="Filtrar por Color"
          options={["Todo", "Amarillo", "Azul", "Violeta"]}
        />
        <Dropdown
          title="Disponibilidad"
          options={["Todo", "Ascendente", "Descendente"]}
        />
      </div>
      <div className="flex flex-wrap p-4 justify-center gap-4">
        {colores.map((color) => (
          <ColoresCard
            key={color.color.texto}
            imagen={color.imagen}
            color={color.color}
            marca={color.marca}
            cantidad={color.cantidad}
          />
        ))}
      </div>
    </>
  );
};

export default MedallasPage;
