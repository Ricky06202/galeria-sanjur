import { FC } from "react";
import { Tag } from "../shared/components/Tag";
interface IColoresCardProps {
  imagen: string;
  color: {
    texto: string;
    valor: string;
  };
  marca: string;
  cantidad: number;
}

export const ColoresCard: FC<IColoresCardProps> = ({
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
      <div className="flex flex-col items-center p-3 h-full bg-gray-100 dark:bg-gray-900">
        <ul className="grid grid-cols-2 grid-rows-2">
          <li className="flex justify-center items-center text-center">
            <Tag color={color.valor}>{color.texto}</Tag>
          </li>
          <li className="flex justify-center items-center">
            <Tag className="bg-blue-800!">{marca}</Tag>
          </li>
          <li className="col-span-2 flex justify-center items-center">
            <div>{cantidad + " Rollos Disponibles"}</div>
          </li>
          
        </ul>
      </div>
    </div>
  );
};
