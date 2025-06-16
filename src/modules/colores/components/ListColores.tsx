import { FC } from "react";
import { ColoresCard } from "./ColoresCard";
import { Filamento } from "@/modules/shared/constants/filamentoType";
interface IListColoresProps {
  colores: Filamento[]
};

export const ListColores: FC<IListColoresProps> = ({colores}) => {
    return (
        <div className="flex flex-wrap p-4 justify-center gap-4">
        {colores.map((color) => (
          <ColoresCard
            key={color.nombre}
            imagen={color.imagen}
            color={{texto: color.Color.nombre, valor: color.Color.valor_hex}}
            marca={color.Marca.nombre}
            cantidad={color.cantidad}
          />
        ))}
      </div>
    );
}
