'use client' // Indica que este es un Client Component

import { useColoresStore } from '@/modules/colores/stores/coloresStore'
import { useMarcasStore } from '@/modules/colores/stores/marcasStore'
import ImageUploadInput from '@/modules/shared/components/ImageUploadInput'
import NumberInput from '@/modules/shared/components/NumberInput'
import SelectInput from '@/modules/shared/components/SelectInput'
import TextInput from '@/modules/shared/components/TextInput'
import { fileToBase64 } from '@/modules/shared/logic/convertImageToBase64'
import { put } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function NuevaMedalla() {

  const handleImageFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoFilamento((prevData) => ({
      ...prevData,
      imagen: e.target.files?.[0] || null, // e.target.files[0] contiene el File object
    }));
  };

  const handleImageClear = () => {
    setNuevoFilamento((prevData) => ({
      ...prevData,
      imagen: null, // Establece la imagen a null
    }));
  };
  // 1 Crear Estados para los campos del formulario
  const [nuevoFilamento, setNuevoFilamento] = useState({
    nombre: '',
    imagen: null as File | null,
    cantidad: '',
    marca: '',
    color: '',
  })

  const [nuevaMarca, setNuevaMarca] = useState({
    nombre: '',
  })

  const [nuevoColor, setNuevoColor] = useState({
    nombre: '',
    valor_hex: '',
  })

  const [editarColor, setEditarColor] = useState({
    id: '',
    nombre: '',
    valor_hex: '',
  })

  // 2 Crear Funciones para manejar cambios de los campos
  const manejarCambios = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    seccion: 'filamento' | 'marca' | 'color' | 'editarColor'
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
      case 'marca':
        setNuevaMarca((prev) => ({ ...prev, [name]: value }))
        break
      case 'color':
        setNuevoColor((prev) => ({ ...prev, [name]: value }))
        break
      case 'editarColor':
        setEditarColor((prev) => ({ ...prev, [name]: value }))
        break
      default:
        break
    }
  }

  // 3 Crear Función para manejar el envío del formulario
  const manejarEnvioFilamento = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(nuevoFilamento)

    // 1 Validar Campos
    if (
      !nuevoFilamento.nombre.trim() ||
      !nuevoFilamento.imagen ||
      !nuevoFilamento.marca ||
      !nuevoFilamento.color
    ) {
      toast.error('Por favor, completa todos los campos correctamente.')
      return
    }

    // 2 Enviar Datos
    const blob = await upload(nuevoFilamento.nombre, nuevoFilamento.imagen, {
      access: 'public',
      handleUploadUrl: '/api/blob',
    })

    const formData = {
      nombre: nuevoFilamento.nombre,
      imagen: blob.url,
      cantidad: parseInt(nuevoFilamento.cantidad),
      marca_id: parseInt(nuevoFilamento.marca),
      color_id: parseInt(nuevoFilamento.color),
    }

    try {
      const response = await fetch('/api/filamentos', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      console.log('Filamento creado exitosamente')
      toast.success('Filamento creado exitosamente')
    } catch (error) {
      console.error('Error al crear el filamento:', error)
      toast.error(
        'Hubo un error al crear el filamento. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioMarca = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos

    if (!nuevaMarca.nombre.trim()) {
      toast.error('Por favor, completa todos los campos correctamente.')
      return
    }
    // 2 Enviar Datos
    const formData = {
      nombre: nuevaMarca.nombre,
    }

    try {
      const response = await fetch('/api/marcas', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      fetchMarcas()

      console.log('Marca creada exitosamente')
      toast.success('Marca creada exitosamente')
    } catch (error) {
      console.error('Error al crear la marca:', error)
      toast.error('Hubo un error al crear la marca. Por favor, inténtalo de nuevo.')
    }
  }

  const manejarEnvioColor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos
    if (!nuevoColor.nombre.trim() || !nuevoColor.valor_hex.trim()) {
      toast.error('Por favor, completa todos los campos correctamente.')
      return
    }

    if (!nuevoColor.valor_hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      toast.error('El Valor debe ser un color en formato hexadecimal.')
      return
    }
    // 2 Enviar Datos
    const formData = {
      nombre: nuevoColor.nombre,
      valor_hex: nuevoColor.valor_hex,
    }

    try {
      const response = await fetch('/api/colores', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      fetchColores()

      console.log('Color creado exitosamente')
      toast.success('Color creado exitosamente')
    } catch (error) {
      console.error('Error al crear el color:', error)
      toast.error('Hubo un error al crear el color. Por favor, inténtalo de nuevo.')
    }
  }

  const manejarEnvioColorEditar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editarColor.id || !editarColor.nombre.trim() || !editarColor.valor_hex.trim()) {
      toast.error('Por favor, completa todos los campos correctamente.')
      return
    }

    if (!editarColor.valor_hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      toast.error('El Valor debe ser un color en formato hexadecimal.')
      return
    }

    const formData = {
      nombre: editarColor.nombre,
      valor_hex: editarColor.valor_hex,
    }

    try {
      const response = await fetch(`/api/colores/${editarColor.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      fetchColores()

      console.log('Color editado exitosamente')
      toast.success('Color editado exitosamente')
    } catch (error) {
      console.error('Error al editar el color:', error)
      toast.error('Hubo un error al editar el color. Por favor, inténtalo de nuevo.')
    }
  }

  const marcas = useMarcasStore((state) => state.marcas)
  const fetchMarcas = useMarcasStore((state) => state.fetchMarcas)
  const colores = useColoresStore((state) => state.colores)
  const fetchColores = useColoresStore((state) => state.fetchColores)

  useEffect(() => {
    fetchMarcas()
    fetchColores()
  }, [])

  

  return (
    // Contenedor principal: Centra el contenido, aplica padding y un fondo suave
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 font-inter text-gray-800">
      <div className="p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl w-full max-w-4xl space-y-10 border border-gray-200">
        {/* Sección: Añadir Nueva Creación 3D */}
        <section
          id="Creaciones"
          className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
            Añadir una Nuevo Filamento
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
              Añadir Filamento
            </button>
          </form>
        </section>

        {/* Sección: Añadir Nueva Marca */}
        <section
          id="Marca"
          className="bg-gradient-to-br from-green-50 to-gray-50 p-8 rounded-xl shadow-lg border border-green-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8 tracking-tight">
            Añadir una Nueva Marca
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioMarca}
          >
            {/* Campo: Marca */}
            <TextInput
              label="Nombre de la Marca"
              name="nombre"
              value={nuevaMarca.nombre}
              onChange={(e) => manejarCambios(e, 'marca')}
              placeholder="Ej. 'Miniaturas'"
            />

            <button
              type="submit"
              className="bg-green-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
            >
              Añadir Marca
            </button>
          </form>
        </section>

        {/* Sección: Añadir Color */}
        <section
          id="Color"
          className="bg-gradient-to-br from-purple-50 to-gray-50 p-8 rounded-xl shadow-lg border border-purple-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-purple-900 mb-8 tracking-tight">
            Añadir un Color
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioColor}
          >
            {/* Campo: nombre */}
            <TextInput
              label="Nombre del Color"
              name="nombre"
              value={nuevoColor.nombre}
              onChange={(e) => manejarCambios(e, 'color')}
              placeholder="Ej. 'Rojo'"
            />

            {/* Campo: valor hex */}
            <TextInput
              label="Valor Hexadecimal"
              name="valor_hex"
              value={nuevoColor.valor_hex}
              onChange={(e) => manejarCambios(e, 'color')}
              placeholder="Ej. '#FFFFFF'"
            />

            <button
              type="submit"
              className="bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
            >
              Añadir Color
            </button>
          </form>
        </section>

        {/* Sección: Editar Color */}
        <section
          id="editarColor"
          className="bg-gradient-to-br from-purple-50 to-gray-50 p-8 rounded-xl shadow-lg border border-purple-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-purple-900 mb-8 tracking-tight">
            Editar un Color
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioColor}
          >
            {/* Campo: id */}
            <SelectInput
              label="Color"
              name="id"
              value={editarColor.id}
              onChange={(e) => manejarCambios(e, 'editarColor')}
              placeholder="Selecciona un Color"
              options={colores.map((color) => ({
                value: color.id.toString(),
                label: color.nombre,
              }))}
            />
            {/* Campo: nombre */}
            <TextInput
              label="Nombre del Color"
              name="nombre"
              value={nuevoColor.nombre}
              onChange={(e) => manejarCambios(e, 'color')}
              placeholder="Ej. 'Rojo'"
            />

            {/* Campo: valor hex */}
            <TextInput
              label="Valor Hexadecimal"
              name="valor_hex"
              value={nuevoColor.valor_hex}
              onChange={(e) => manejarCambios(e, 'color')}
              placeholder="Ej. '#FFFFFF'"
            />

            <button
              type="submit"
              className="bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
            >
              Añadir Color
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
