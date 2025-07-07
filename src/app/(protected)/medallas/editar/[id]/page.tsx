'use client' // Indica que este es un Client Component

import {
  base64ToFile,
  fileToBase64,
} from '@/modules/shared/logic/convertImageToBase64'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { useCategoriasStore } from '@/modules/medallas/stores/categoriasStore'
import ImageUploadInput from '@/modules/shared/components/ImageUploadInput'
import NumberInput from '@/modules/shared/components/NumberInput'
import SelectInput from '@/modules/shared/components/SelectInput'
import TextInput from '@/modules/shared/components/TextInput'
import { useGaleriaStore } from '@/modules/medallas/stores/galeriaStore'
import { put } from '@vercel/blob'
import { upload } from '@vercel/blob/client'

export default function EditarMedalla() {
  const { id } = useParams()
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

  const galeria = useGaleriaStore((state) => state.galeria)
  const fetchGaleria = useGaleriaStore((state) => state.fetchGaleria)

  useEffect(() => {
    fetchGaleria(id!.toString())
  }, [])

  const handleImageFileSelectGaleria = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevaGaleria((prevData) => ({
      ...prevData,
      imagen: e.target.files?.[0] || null, // e.target.files[0] contiene el File object
    }))
  }

  const handleImageClearGaleria = () => {
    setNuevaGaleria((prevData) => ({
      ...prevData,
      imagen: null, // Establece la imagen a null
    }))
  }

  const handleImageFileSelectEditarGaleria = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEditarGaleria((prevData) => ({
      ...prevData,
      imagen: e.target.files?.[0] || null, // e.target.files[0] contiene el File object
    }))
  }

  const handleImageClearEditarGaleria = () => {
    setEditarGaleria((prevData) => ({
      ...prevData,
      imagen: null, // Establece la imagen a null
    }))
  }

  const [nuevaGaleria, setNuevaGaleria] = useState({
    imagen: null as File | null,
  })

  const [editarGaleria, setEditarGaleria] = useState({
    id: '',
    imagen: null as File | null,
  })

  useEffect(() => {
    // buscar la imagen
    const imagen = galeria.find(
      (galeria) => galeria.id === parseInt(editarGaleria.id)
    )
    if (!imagen) return
    let fileImage = null
    try {
      fileImage = base64ToFile(imagen.imagen, 'Imagen #' + imagen.id)
    } catch (error) {
      console.error('Error al convertir la imagen:', error)
    }
    setEditarGaleria((prevData) => ({
      ...prevData,
      imagen: fileImage,
    }))
  }, [editarGaleria.id])

  // 1 Crear Estados para los campos del formulario
  const [nuevaCreacion, setNuevaCreacion] = useState({
    nombre: '',
    descripcion: '',
    imagen: null as File | null,
    duracionHoras: '',
    duracionMinutos: '',
    precio: '',
    categoria: '',
  })

  const [nuevoFilamentoUsado, setNuevoFilamentoUsado] = useState({
    filamentoUsado: '',
  })
  // 2 Crear Funciones para manejar cambios de los campos
  const manejarCambios = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    seccion: 'creacion' | 'filamento' | 'galeria'
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
      case 'filamento':
        setNuevoFilamentoUsado((prev) => ({ ...prev, [name]: value }))
        break
      case 'galeria':
        setEditarGaleria((prev) => ({ ...prev, [name]: value }))
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
      !nuevaCreacion.categoria ||
      !nuevaCreacion.descripcion
    ) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }

    // 2 Enviar Datos
    const blob = await upload(nuevaCreacion.nombre, nuevaCreacion.imagen, {
      access: 'public',
      handleUploadUrl: '/api/blob',
    })

    const formData = {
      nombre: nuevaCreacion.nombre,
      descripcion: nuevaCreacion.descripcion,
      imagen: blob.url,
      duracion:
        parseInt(nuevaCreacion.duracionHoras) * 60 +
        parseInt(nuevaCreacion.duracionMinutos),
      precio: parseFloat(nuevaCreacion.precio),
      categoria_id: parseInt(nuevaCreacion.categoria),
    }

    try {
      const response = await fetch(`/api/creaciones/${id}`, {
        method: 'PUT',
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
      console.error('Error al editar la creación 3D:', error)
      alert(
        'Hubo un error al editar la creación 3D. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioFilamentoUsado = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 1 Validar Campos
    if (!nuevoFilamentoUsado.filamentoUsado) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }
    // 2 Enviar Datos
    const formData = {
      filamentos_id: parseInt(nuevoFilamentoUsado.filamentoUsado),
    }
    try {
      const response = await fetch(`/api/creaciones_filamentos/${id}`, {
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
      console.log('Filamento usado agregado exitosamente')
      alert('Filamento usado agregado exitosamente')
    } catch (error) {
      console.error('Error al agregar el filamento usado:', error)
      alert(
        'Hubo un error al agregar el filamento usado. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioGaleriaAgregar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nuevaGaleria.imagen) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }
    const blob = await upload(creacion.nombre, nuevaGaleria.imagen, {
      access: 'public',
      handleUploadUrl: '/api/blob',
    })
    const formData = {
      imagen: blob.url,
    }
    try {
      const response = await fetch(`/api/galeria_creaciones/${id}`, {
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
      console.log('Galeria agregada exitosamente')
      alert('Galeria agregada exitosamente')
    } catch (error) {
      console.error('Error al agregar la galeria:', error)
      alert(
        'Hubo un error al agregar la galeria. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const manejarEnvioGaleriaEditar = async () => {
    if (!editarGaleria.imagen || !editarGaleria.id) {
      alert('Por favor, completa todos los campos correctamente.')
      return
    }
    const blob = await upload(creacion.nombre, editarGaleria.imagen, {
      access: 'public',
      handleUploadUrl: '/api/blob',
    })
    const formData = {
      imagen: blob.url,
    }
    try {
      const response = await fetch(
        `/api/galeria_creaciones/${editarGaleria.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      // const data = await response.json()
      console.log('Galeria editada exitosamente')
      alert('Galeria editada exitosamente')
    } catch (error) {
      console.error('Error al editar la galeria:', error)
      alert(
        'Hubo un error al editar la galeria. Por favor, inténtalo de nuevo.'
      )
    }
  }

  const filamentos = useFilamentosStore((state) => state.filamentos)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)
  const categorias = useCategoriasStore((state) => state.categorias)
  const fetchCategorias = useCategoriasStore((state) => state.fetchCategorias)

  const [creacion, setCreacion] = useState({
    id: 0,
    nombre: '',
  })

  const fetchCreacion = async () => {
    const response = await fetch(`/api/creaciones/${id}`)
    const data = await response.json()
    setCreacion({
      id: data.id,
      nombre: data.nombre,
    })
    let fileImage = null
    try {
      fileImage = base64ToFile(data.imagen, data.nombre)
    } catch (error) {
      console.error('Error al convertir la imagen:', error)
    }
    setNuevaCreacion({
      nombre: data.nombre,
      descripcion: data.descripcion,
      imagen: fileImage,
      duracionHoras: Math.trunc(data.duracion / 60).toString(),
      duracionMinutos: (data.duracion % 60).toString(),
      precio: data.precio.toString(),
      categoria: data.Categoria.id.toString(),
    })
  }

  useEffect(() => {
    fetchFilamentos()
    fetchCategorias()
    fetchCreacion()
  }, [])

  return (
    // Contenedor principal: Centra el contenido, aplica padding y un fondo suave
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 font-inter text-gray-800">
      <div className="p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl w-full max-w-4xl space-y-10 border border-gray-200">
        {/* Sección: Editar Creación 3D */}
        <section
          id="Creaciones"
          className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
            Editar Creación 3D
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

            {/* Campo: Descripción */}
            <TextInput
              label="Descripción de la Creación"
              placeholder="Ej. 'Descripción de la Creación'"
              name="descripcion"
              value={nuevaCreacion.descripcion}
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
              Editar Creación 3D
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
              name="creacion"
              value={creacion.id.toString()}
              onChange={(e) => manejarCambios(e, 'filamento')}
              options={[
                {
                  value: creacion.id.toString(),
                  label: creacion.nombre,
                },
              ]}
              placeholder="Selecciona una creación 3D"
              disabled
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

        {/** Section: Añadir Imagenes */}
        {/* Sección: Añadir Imagenes */}
        <section
          id="Imagenes"
          className="bg-gradient-to-br from-yellow-50 to-gray-50 p-8 rounded-xl shadow-lg border border-yellow-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-yellow-900 mb-8 tracking-tight">
            Agregar Imagen a la Galeria
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioGaleriaAgregar}
          >
            {/* Campo: Elija la Creación 3D Correspondiente */}
            <SelectInput
              label="Elija la Creación 3D Correspondiente"
              name="creacion"
              value={creacion.id.toString()}
              onChange={() => {}}
              options={[
                {
                  value: creacion.id.toString(),
                  label: creacion.nombre,
                },
              ]}
              placeholder="Selecciona una creación 3D"
              disabled
            />

            {/* Campo: Imagen */}
            <ImageUploadInput
              label="Imagen"
              name="imagen"
              value={nuevaGaleria.imagen}
              accept="image/*"
              onFileSelect={handleImageFileSelectGaleria}
              onClear={handleImageClearGaleria}
              placeholderText="Haz clic o arrastra para subir una imagen"
              helpText="PNG, JPG, GIF hasta 5MB"
            />

            <button
              type="submit"
              className="bg-yellow-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-yellow-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2"
            >
              Agregar Imagen
            </button>
          </form>
        </section>

        {/** Section: Editar Imagen Galeria */}
        <section
          id="Imagenes"
          className="bg-gradient-to-br from-yellow-50 to-gray-50 p-8 rounded-xl shadow-lg border border-yellow-100 transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-center text-yellow-900 mb-8 tracking-tight">
            Editar Imagen de la Galeria
          </h2>
          <form
            className="flex flex-col items-center justify-center space-y-7"
            onSubmit={manejarEnvioGaleriaEditar}
          >
            {/* Campo: Elija la Creación 3D Correspondiente */}
            <SelectInput
              label="Elija la Creación 3D Correspondiente"
              name="creacion"
              value={creacion.id.toString()}
              onChange={() => {}}
              options={[
                {
                  value: creacion.id.toString(),
                  label: creacion.nombre,
                },
              ]}
              placeholder="Selecciona una creación 3D"
              disabled
            />

            {/** Campo: Elija la Imagen */}
            <SelectInput
              label="Elija la Imagen"
              name="id"
              value={editarGaleria.id.toString()}
              onChange={(e) => manejarCambios(e, 'galeria')}
              options={galeria?.map((galeria_creacion) => ({
                value: galeria_creacion.id.toString(),
                label: 'Imagen #' + galeria_creacion.id,
              }))}
              placeholder="Selecciona una imagen"
            />

            {/* Campo: Imagen */}
            <ImageUploadInput
              label="Imagen"
              name="imagen"
              value={editarGaleria.imagen}
              accept="image/*"
              onFileSelect={handleImageFileSelectEditarGaleria}
              onClear={handleImageClearEditarGaleria}
              placeholderText="Haz clic o arrastra para subir una imagen"
              helpText="PNG, JPG, GIF hasta 5MB"
            />

            <button
              type="submit"
              className="bg-yellow-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-yellow-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2"
            >
              Editar Imagen
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
