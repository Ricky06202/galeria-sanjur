import { FC } from "react";
import { Logo } from "./Logo";
import { NavbarLink } from "./Navbar-Link";

export const Navbar: FC = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
            <Logo />
            <ul className="flex space-x-4">
                <NavbarLink href={"/medallas"} text="Medallas" />
                <NavbarLink href={"/colores"} text="Colores" />
                <NavbarLink href={"/contacto"} text="Contactanos" />
            </ul>
            <div></div>
        </nav>
    );
}
