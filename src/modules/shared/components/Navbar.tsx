"use client"
import { FC } from "react";
import { Logo } from "./Logo";
import { NavbarLink } from "./Navbar-Link";
import ProfileButton from "./ProfileButton";
import { useSession } from "next-auth/react";

export const Navbar: FC = () => {
    const { data: session } = useSession();
    return (
        <nav className="flex  flex-col lg:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800">
            <Logo />
            <ul className="flex flex-2 space-x-4 w-full justify-center items-center">
                <NavbarLink href={"/medallas"} text="Medallas" />
                <NavbarLink href={"/colores"} text="Colores" />
                <NavbarLink href={"/contacto"} text="Contactanos" />
                {session?.user?.role === "admin" && <NavbarLink href={"/inventario"} text="Inventario" />}
            </ul>
            <div className="flex flex-1 justify-center">
                <ProfileButton />
            </div>
        </nav>
    );
}
