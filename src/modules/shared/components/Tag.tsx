import { FC } from "react";
interface ITagProps {
    children: React.ReactNode;
    className?: string;
    colorFondo?: string;
    colorTexto?: string;
};

export const Tag: FC<ITagProps> = ({ children, className, colorFondo, colorTexto }) => {
    return (
        <div style={{ backgroundColor: colorFondo, color: colorTexto }} className={"px-2 rounded-full w-fit " + className}>
            {children}
        </div>
    );
}
