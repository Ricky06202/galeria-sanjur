import { Dropdown } from "@/modules/shared/components/Dropdown";
import { SearchBar } from "@/modules/shared/components/SearchBar";
import { FC } from "react";

export const MedallasPage: FC = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 gap-4">
            <SearchBar placeholder="Busca algo!" />
            <Dropdown title='Filtrar por Color' options={['Todo','Amarillo', 'Azul', 'Violeta']} />
            <Dropdown title='Disponibilidad' options={['Todo','Ascendente', 'Descendente']} />
        </div>
    );
}

export default MedallasPage;
