import { ChangeEvent } from 'react'

interface INumberInputProps {
  className?: string
  label: string
  name: string
  placeholder: string
  value: string
  min?: string
  max?: string
  step?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function NumberInput({
  className = "",
  label,
  name,
  placeholder,
  value,
  min,
  max,
  step,
  onChange,
}: INumberInputProps) {
  return (
    <div className={className ? className : "w-full max-w-md"}>
      <label
        htmlFor={name}
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="number"
        id={name}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400"
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}
