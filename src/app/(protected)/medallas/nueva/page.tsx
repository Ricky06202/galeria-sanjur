/* eslint-disable react-hooks/exhaustive-deps */
'use client' // Indica que este es un Client Component

import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { useCategoriasStore } from '@/modules/medallas/stores/categoriasStore'
import { useCreacionesStore } from '@/modules/medallas/stores/creacionesStore'
import ImageUploadInput from '@/modules/shared/components/ImageUploadInput'
import NumberInput from '@/modules/shared/components/NumberInput'
import SelectInput from '@/modules/shared/components/SelectInput'
import TextInput from '@/modules/shared/components/TextInput'
import { fileToBase64 } from '@/modules/shared/logic/convertImageToBase64'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function NuevaMedalla() {
  const handleImageFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevaCreacion((prevData) => ({
      ...prevData,
      imagen: e.target.files?.[0] || null, // e.target.files[0] contiene el File object
    }))
  }

  const handleImageClear = () => {
    setNuevaCreacion((prevData) => ({
      ...prevData,
      imagen: null, // Establece la imagen a null
    }))
  }
  // 1 Crear Estados para los campos del formulario
  const [nuevaCreacion, setNuevaCreacion] = useState({
    nombre: '',
    imagen: null as File | null,
    duracionHoras: '',
    duracionMinutos: '',
    precio: '',
    categoria: '',
  })

  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
  })

  const [nuevoFilamentoUsado, setNuevoFilamentoUsado] = useState({
    creacion3D: '',
    filamentoUsado: '',
  })

  // 2 Crear Funciones para manejar cambios de los campos
  const manejarCambios = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    seccion: 'creacion' | 'categoria' | 'filamento'
  ) => {
    const { name, value, type } = e.target
    const files = (e.target as HTMLInputElement).files
    switch (seccion) {
      case 'creacion':
        setNuevaCreacion((prev) => ({
          ...prev,
          [name]: type === 'file' ? files?.[0] : value,
        }))
        break
      case 'categoria':
        setNuevaCategoria((prev) => ({ ...prev, [name]: value }))
        break
      case 'filamento':
        setNuevoFilamentoUsado((prev) => ({ ...prev, [name]: value }))
        break
      default:
        break
    }
  }

  // 3 Crear Función para manejar el envío del formulario
  const manejarEnvioCreacion3D = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(nuevaCreacion)

    // 1 Validar Campos
    if (
      !nuevaCreacion.nombre.trim() ||
      !nuevaCreacion.imagen ||
      !nuevaCreacion.categoria
    ) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }

    // 2 Enviar Datos
    const imagenBase64 = await fileToBase64(nuevaCreacion.imagen)

    const formData = {
      nombre: nuevaCreacion.nombre,
      imagen: imagenBase64,
      duracion:
        parseInt(nuevaCreacion.duracionHoras) * 60 +
        parseInt(nuevaCreacion.duracionMinutos),
      precio: parseFloat(nuevaCreacion.precio),
      categoria_id: parseInt(nuevaCreacion.categoria),
    }

    try {
      const response = await fetch('/api/creaciones', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      // const data = await response.json()
      console.log('Creación 3D creada exitosamente')
      alert('Creación 3D creada exitosamente')
    } catch (error) {
      console.error('Error al crear la creación 3D:', error)
      alert(
        'Hubo un error al crear la creación 3D. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioCategoria = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos
    if (!nuevaCategoria.nombre.trim()) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }
    // 2 Enviar Datos
    const formData = {
      nombre: nuevaCategoria.nombre,
    }
    try {
      const response = await fetch('/api/categorias', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      // const data = await response.json()
      console.log('Categoria creada exitosamente')
      alert('Categoria creada exitosamente')
    } catch (error) {
      console.error('Error al crear la categoria:', error)
      alert(
        'Hubo un error al crear la categoria. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioFilamentoUsado = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos
    if (
      !nuevoFilamentoUsado.creacion3D ||
      !nuevoFilamentoUsado.filamentoUsado
    ) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }
    // 2 Enviar Datos
    const formData = {
      creaciones_id: parseInt(nuevoFilamentoUsado.creacion3D),
      filamentos_id: parseInt(nuevoFilamentoUsado.filamentoUsado),
    }
    try {
      const response = await fetch('/api/creaciones_filamentos', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      // const data = await response.json()
      console.log('Filamento usado creado exitosamente')
      alert('Filamento usado creado exitosamente')
    } catch (error) {
      console.error('Error al crear el filamento usado:', error)
      alert(
        'Hubo un error al crear el filamento usado. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const filamentos = useFilamentosStore((state) => state.filamentos)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)
  const categorias = useCategoriasStore((state) => state.categorias)
  const fetchCategorias = useCategoriasStore((state) => state.fetchCategorias)
  const creaciones = useCreacionesStore((state) => state.creaciones)
  const fetchCreaciones = useCreacionesStore((state) => state.fetchCreaciones)

  useEffect(() => {
    fetchFilamentos()
    fetchCategorias()
    fetchCreaciones()
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
            Añadir una Nueva Creación 3D
          </h1>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioCreacion3D}
          >
            {/* Campo: Nombre de la Creación */}
            <TextInput
              label="Nombre de la Creación"
              placeholder="Ej. 'Dragón Alado'"
              name="nombre"
              value={nuevaCreacion.nombre}
              onChange={(e) => manejarCambios(e, 'creacion')}
            />

            {/* Campo: Imagen */}
            <ImageUploadInput
              label="Imagen de la Creación"
              name="imagen"
              value={nuevaCreacion.imagen}
              onFileSelect={handleImageFileSelect}
              onClear={handleImageClear}
            />

            {/* Campo: Duración */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-md gap-6">
              <NumberInput
                className="w-full"
                label="Duración (horas)"
                name="duracionHoras"
                placeholder="Ej. 2"
                value={nuevaCreacion.duracionHoras}
                onChange={(e) => manejarCambios(e, 'creacion')}
              />
              <NumberInput
                className="w-full"
                label="Duración (minutos)"
                name="duracionMinutos"
                placeholder="Ej. 30"
                value={nuevaCreacion.duracionMinutos}
                onChange={(e) => manejarCambios(e, 'creacion')}
              />
            </div>

            {/* Campo: Precio */}
            <NumberInput
              label="Precio ($)"
              name="precio"
              placeholder="Ej. 2.99"
              value={nuevaCreacion.precio}
              onChange={(e) => manejarCambios(e, 'creacion')}
            />

            {/* Campo: Categoría */}
            <SelectInput
              label="Categoría"
              name="categoria"
              value={nuevaCreacion.categoria}
              onChange={(e) => manejarCambios(e, 'creacion')}
              options={categorias.map((categoria) => ({
                value: categoria.id.toString(),
                label: categoria.nombre,
              }))}
              placeholder="Selecciona una categoría"
            />

            <button
              type="submit"
              className="bg-blue-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            >
              Guardar Creación 3D
            </button>
          </form>
        </section>

        {/* Sección: Añadir Nueva Categoría */}
        <section
          id="Categoria"
          className="bg-gradient-to-br from-green-50 to-gray-50 p-8 rounded-xl shadow-lg border border-green-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8 tracking-tight">
            Añadir una Nueva Categoría
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioCategoria}
          >
            {/* Campo: Categoría */}
            <TextInput
              label="Nombre de la Categoría"
              name="nombre"
              value={nuevaCategoria.nombre}
              onChange={(e) => manejarCambios(e, 'categoria')}
              placeholder="Ej. 'Miniaturas'"
            />

            <button
              type="submit"
              className="bg-green-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
            >
              Añadir Categoría
            </button>
          </form>
        </section>

        {/* Sección: Añadir Filamentos Usados */}
        <section
          id="Filamentos-Usados"
          className="bg-gradient-to-br from-purple-50 to-gray-50 p-8 rounded-xl shadow-lg border border-purple-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-purple-900 mb-8 tracking-tight">
            Registrar Filamento Usado
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioFilamentoUsado}
          >
            {/* Campo: Elija la Creación 3D Correspondiente */}
            <SelectInput
              label="Elija la Creación 3D Correspondiente"
              name="creacion3D"
              value={nuevoFilamentoUsado.creacion3D}
              onChange={(e) => manejarCambios(e, 'filamento')}
              options={creaciones.map((creacion) => ({
                value: creacion.id.toString(),
                label: creacion.nombre,
              }))}
              placeholder="Selecciona una creación 3D"
            />

            {/* Campo: Filamento Usado */}
            <SelectInput
              label="Filamento Usado"
              name="filamentoUsado"
              value={nuevoFilamentoUsado.filamentoUsado}
              onChange={(e) => manejarCambios(e, 'filamento')}
              options={filamentos.map((filamento) => ({
                value: filamento.id.toString(),
                label: filamento.Color.nombre,
              }))}
              placeholder="Selecciona un filamento"
            />

            <button
              type="submit"
              className="bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
            >
              Agregar Filamento Usado
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
