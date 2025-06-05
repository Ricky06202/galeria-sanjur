import Link from "next/link";
import { FC } from "react";
interface INavbarLinkProps {
  href: string;
  text: string;
}

export const NavbarLink: FC<INavbarLinkProps> = ({ href, text }) => {
  return (
    <Link href={href} className="hover:underline hover:text-blue-500">
      {text}
    </Link>
  );
};
