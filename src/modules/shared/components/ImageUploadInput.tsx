/* eslint-disable @next/next/no-img-element */
// components/ImageUploadInput.js
'use client';

import React, { ChangeEvent, useRef } from 'react';

interface ImageUploadInputProps {
  label: string;
  name: string;
  value: File | null;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  accept?: string;
  placeholderText?: string;
  helpText?: string;
}

export default function ImageUploadInput({
  label,
  name,
  value,
  onFileSelect,
  onClear,
  accept = 'image/*',
  placeholderText = 'Haz clic o arrastra para subir una imagen',
  helpText = 'PNG, JPG, GIF hasta 5MB',
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maneja el cambio en el input de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e); // Pasa el evento completo al componente padre
  };

  // Activa el clic en el input de archivo oculto
  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  // Limpia la imagen seleccionada y notifica al padre
  const handleClearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que se propague el clic al div padre (que abriría el selector)
    if (onClear) {
      onClear(); // Notifica al padre que la imagen ha sido eliminada
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetea el input de archivo
    }
  };

  return (
    <div className="w-full max-w-md">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-300 ease-in-out"
        onClick={handleAreaClick}
      >
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" // pointer-events-none evita doble apertura
        />
        {value ? ( // 'value' es el objeto File pasado como prop
          <div className="flex flex-col items-center">
            <img
              src={URL.createObjectURL(value)} // Crea URL para la vista previa
              alt="Vista previa de la imagen"
              className="max-w-full h-32 object-contain rounded-md mb-3 shadow-md"
            />
            <p className="text-sm text-gray-600 truncate w-full px-2">{value.name}</p>
            <button
              type="button"
              onClick={handleClearImage}
              className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Quitar imagen
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-lg font-medium">{placeholderText}</p>
            {helpText && <p className="text-sm">{helpText}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
