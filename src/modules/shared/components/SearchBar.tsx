import { FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface ISearchBarProps {
  placeholder: string;
}

export const SearchBar: FC<ISearchBarProps> = ({ placeholder }) => {
  return (
    <div className="px-4 flex items-center justify-between bg-gray-200 rounded-full p-2 w-full dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 focus-within:outline-2 focus-within:outline-gray-200">
      <input
        className="w-full focus:outline-none bg-transparent"
        type="text"
        placeholder={placeholder}
      />
      <div className="flex items-center">
        <SearchIcon />
      </div>
    </div>
  );
};
