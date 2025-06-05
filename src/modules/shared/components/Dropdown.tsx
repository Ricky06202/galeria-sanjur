import { FC } from "react";
interface IDropdownProps {
  title: string;
  options: string[];
}

export const Dropdown: FC<IDropdownProps> = ({ title, options }) => {
  return (
    <select className="bg-gray-50 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 active:outline-gray-600 dark:placeholder-gray-400 dark:text-white">
      <option
        className=" dark:text-gray-300 dark:bg-gray-800"
        value={0}
        disabled
        selected
      >
        {title}
      </option>
      {options.map((option, index) => (
        <option
          className="  dark:text-gray-300 dark:bg-gray-700"
          key={option}
          value={index}
        >
          {option}
        </option>
      ))}
    </select>
  );
};
