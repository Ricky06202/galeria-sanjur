/* eslint-disable react-hooks/exhaustive-deps */
'use client' // Indica que este es un Client Component

import { useColoresStore } from '@/modules/colores/stores/coloresStore'
import { useMarcasStore } from '@/modules/colores/stores/marcasStore'
import {
  base64ToFile,
  fileToBase64,
} from '@/modules/shared/logic/convertImageToBase64'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ImageUploadInput from '@/modules/shared/components/ImageUploadInput'
import NumberInput from '@/modules/shared/components/NumberInput'
import SelectInput from '@/modules/shared/components/SelectInput'
import TextInput from '@/modules/shared/components/TextInput'

export default function NuevaMedalla() {
  const { id } = useParams()

  const handleImageFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoFilamento((prevData) => ({
      ...prevData,
      imagen: e.target.files?.[0] || null, // e.target.files[0] contiene el File object
    }))
  }

  const handleImageClear = () => {
    setNuevoFilamento((prevData) => ({
      ...prevData,
      imagen: null, // Establece la imagen a null
    }))
  }

  const fetchFilamento = () => {
    fetch(`/api/filamentos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let fileImage = null
        try {
          fileImage = base64ToFile(data.imagen, data.nombre)
        } catch (error) {
          console.error('Error al convertir la imagen:', error)
          fileImage = null
        }
        setNuevoFilamento({
          nombre: data.nombre,
          imagen: fileImage,
          cantidad: data.cantidad,
          marca: data.Marca.id,
          color: data.Color.id,
        })
      })
  }
  // 1 Crear Estados para los campos del formulario
  const [nuevoFilamento, setNuevoFilamento] = useState({
    nombre: '',
    imagen: null as File | null,
    cantidad: '',
    marca: '',
    color: '',
  })

  // 2 Crear Funciones para manejar cambios de los campos
  const manejarCambios = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    seccion: 'filamento' | 'marca' | 'color'
  ) => {
    const { name, value, type } = e.target
    const files = (e.target as HTMLInputElement).files
    switch (seccion) {
      case 'filamento':
        setNuevoFilamento((prev) => ({
          ...prev,
          [name]: type === 'file' ? files?.[0] : value,
        }))
        break
      default:
        break
    }
  }

  // 3 Crear Función para manejar el envío del formulario
  const manejarEnvioFilamento = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos
    if (
      !nuevoFilamento.nombre.trim() ||
      !nuevoFilamento.imagen ||
      !nuevoFilamento.marca ||
      !nuevoFilamento.color
    ) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }

    // 2 Enviar Datos
    const imagenBase64 = await fileToBase64(nuevoFilamento.imagen)

    const formData = {
      nombre: nuevoFilamento.nombre,
      imagen: imagenBase64,
      cantidad: parseInt(nuevoFilamento.cantidad),
      marca_id: parseInt(nuevoFilamento.marca),
      color_id: parseInt(nuevoFilamento.color),
    }

    try {
      const response = await fetch(`/api/filamentos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      console.log('Filamento editado exitosamente')
      alert('Filamento editado exitosamente')
    } catch (error) {
      console.error('Error al editar el filamento:', error)
      alert(
        'Hubo un error al editar el filamento. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const marcas = useMarcasStore((state) => state.marcas)
  const fetchMarcas = useMarcasStore((state) => state.fetchMarcas)
  const colores = useColoresStore((state) => state.colores)
  const fetchColores = useColoresStore((state) => state.fetchColores)

  useEffect(() => {
    fetchMarcas()
    fetchColores()
    fetchFilamento()
  }, [])

  return (
    // Contenedor principal: Centra el contenido, aplica padding y un fondo suave
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 font-inter text-gray-800">
      <div className="p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl w-full max-w-4xl space-y-10 border border-gray-200">
        {/* Sección: Editar Filamento */}
        <section
          id="Filamento"
          className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
            Editar Filamento
          </h1>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioFilamento}
          >
            {/* Campo: Nombre del filamento */}
            <TextInput
              label="Nombre del Filamento"
              name="nombre"
              value={nuevoFilamento.nombre}
              onChange={(e) => manejarCambios(e, 'filamento')}
              placeholder="Nombre del Filamento"
            />

            {/* Campo: Imagen */}
            <ImageUploadInput
              label="Imagen del Filamento"
              name="imagen"
              value={nuevoFilamento.imagen}
              onFileSelect={handleImageFileSelect}
              onClear={handleImageClear}
            />

            {/* Campo: Cantidad */}
            <NumberInput
              label="Cantidad (rollos)"
              name="cantidad"
              min="0"
              step="1"
              value={nuevoFilamento.cantidad}
              onChange={(e) => manejarCambios(e, 'filamento')}
              placeholder="Cantidad (rollos)"
            />

            {/* Campo: Marca */}
            <SelectInput
              label="Marca"
              name="marca"
              value={nuevoFilamento.marca}
              onChange={(e) => manejarCambios(e, 'filamento')}
              placeholder="Marca"
              options={marcas.map((marca) => ({
                value: marca.id.toString(),
                label: marca.nombre,
              }))}
            />

            {/* Campo: Color */}
            <SelectInput
              label="Color"
              name="color"
              value={nuevoFilamento.color}
              onChange={(e) => manejarCambios(e, 'filamento')}
              placeholder="Color"
              options={colores.map((color) => ({
                value: color.id.toString(),
                label: color.nombre,
              }))}
            />

            <button
              type="submit"
              className="bg-blue-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            >
              Editar Filamento
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
