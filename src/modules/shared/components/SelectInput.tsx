import React from 'react'

interface SelectInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  placeholder: string
  className?: string
  disabled?: boolean
}

export default function SelectInput({
  className = "",
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: SelectInputProps) {
  return (
    <div className={className ? className : "w-full max-w-md"}>
      <label
        htmlFor={name}
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 ease-in-out bg-white text-gray-800 appearance-none pr-8 disabled:bg-gray-100 disabled:text-gray-500"
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
