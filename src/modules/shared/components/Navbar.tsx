import { FC } from "react";
import { Logo } from "./Logo";
import { NavbarLink } from "./Navbar-Link";

export const Navbar: FC = () => {
    return (
        <nav className="flex  flex-col lg:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800">
            <Logo />
            <ul className="flex flex-2 space-x-4 w-full justify-center items-center">
                <NavbarLink href={"/medallas"} text="Medallas" />
                <NavbarLink href={"/colores"} text="Colores" />
                <NavbarLink href={"/contacto"} text="Contactanos" />
            </ul>
            <div className="flex flex-1"></div>
        </nav>
    );
}
