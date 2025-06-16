/* eslint-disable @next/next/no-img-element */
import { Tag } from "@/modules/shared/components/Tag";
import { getAppropriateTextColor } from "@/modules/shared/logic/colorContrast";
import { FC } from "react";
interface IColoresCardProps {
  nombre: string;
  imagen: string;
  color: {
    texto: string;
    valor: string;
  };
  marca: string;
  cantidad: number;
}

export const ColoresCard: FC<IColoresCardProps> = ({
  nombre,
  imagen,
  color,
  marca,
  cantidad,
}) => {
  return (
    <div className="w-60 rounded-xl overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700">
        <img className="w-full h-40 object-cover" src={imagen} alt={color.texto} />
      </div>
      <div className="flex flex-col items-center p-3 h-full bg-gray-300 dark:bg-gray-900">
        <h2 className="text-lg font-bold mb-2">{nombre}</h2>
        <ul className="grid grid-cols-2 grid-rows-2">
          <li className="flex justify-center items-center text-center">
            <Tag colorFondo={color.valor} colorTexto={getAppropriateTextColor(color.valor)}>{color.texto}</Tag>
          </li>
          <li className="flex justify-center items-center">
            <Tag className="bg-blue-800 text-white">{marca}</Tag>
          </li>
          <li className="col-span-2 flex justify-center items-center">
            <div>{cantidad + " Rollos Disponibles"}</div>
          </li>
          
        </ul>
      </div>
    </div>
  );
};
