import { FC } from "react";
interface ITagProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
};

export const Tag: FC<ITagProps> = ({ children, className, color }) => {
    return (
        <div style={{backgroundColor: color}} className={"px-2 rounded-full w-fit " + className }>
            {children}
        </div>
    );
}
