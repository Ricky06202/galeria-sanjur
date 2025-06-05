import { Dropdown } from "@/modules/shared/components/Dropdown";
import { SearchBar } from "@/modules/shared/components/SearchBar";

export default function Home() {
  return (
    <>
    <div>Esta Puede ser una Pagina que describa mejor lo que hacemos</div>
    <SearchBar placeholder="Busca algo!" />
    <Dropdown title='mascotas' options={['Perros', 'Gatos', 'Pajaros']} />
    </>
  );
}
