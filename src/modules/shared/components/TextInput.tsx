import { ChangeEvent } from "react";

interface ITextInputProps {
  className?: string
  label: string
  name: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
  className = "",
  label,
  name,
  placeholder,
  value,
  onChange,
}: ITextInputProps) {
  return (
    <div className={className ? className : "w-full max-w-md"}>
      <label
        htmlFor={name}
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}
