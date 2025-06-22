import Link from "next/link";
import { FC } from "react";
interface INavbarLinkProps {
  href: string;
  text: string;
}

export const NavbarLink: FC<INavbarLinkProps> = ({ href, text }) => {
  return (
    <Link href={href} className="text-gray-600 hover:text-green-600 font-medium">
      {text}
    </Link>
  );
};
