import { FC } from "react";
interface IDropdownProps {
  title: string;
  options: string[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}

export const Dropdown: FC<IDropdownProps> = ({ title, options, value, onChange }) => {
  return (
    <select className="bg-gray-50 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 active:outline-gray-600 dark:placeholder-gray-400 dark:text-white"
    value={value}
    onChange={onChange}
    >
      <option
        className=" dark:text-gray-300 dark:bg-gray-800"
        value={''}
        disabled
      >
        {title}
      </option>
      {options.map((option) => (
        <option
          className="  dark:text-gray-300 dark:bg-gray-700"
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
};
