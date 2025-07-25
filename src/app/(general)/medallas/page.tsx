'use client'
import { ListMedallas } from '@/modules/medallas/components/ListMedallas'
import { useCategoriasStore } from '@/modules/medallas/stores/categoriasStore'
import { useCreacionesStore } from '@/modules/medallas/stores/creacionesStore'
import { Dropdown } from '@/modules/shared/components/Dropdown'
import { SearchBar } from '@/modules/shared/components/SearchBar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function MedallasPage() {
  const [categoria, setCategoria] = useState<string>('')
  const [precio, setPrecio] = useState<string>('')
  const [busqueda, setBusqueda] = useState<string>('')

  const medallas = useCreacionesStore((state) => state.creacionesFiltradas)

  const fetchMedallas = useCreacionesStore((state) => state.fetchCreaciones)
  const filtroReset = useCreacionesStore((state) => state.filtroReset)
  const filtrarBusqueda = useCreacionesStore((state) => state.filtrarBusqueda)
  const filtrarCategoria = useCreacionesStore((state) => state.filtrarCategoria)
  const filtrarPrecio = useCreacionesStore((state) => state.filtrarPrecio)

  const categorias = useCategoriasStore((state) => state.categorias)
  const fetchCategorias = useCategoriasStore((state) => state.fetchCategorias)

  useEffect(() => {
    fetchMedallas()
    fetchCategorias()
  }, [])

  useEffect(() => {
    filtroReset()
    filtrarBusqueda(busqueda)
    filtrarCategoria(categoria)
    filtrarPrecio(precio)
  }, [busqueda, categoria, precio])

  const redirigirPagina = () => {
    redirect('/medallas/nueva')
  }

  const session = useSession()
  const isAdmin = session?.data?.user?.role === 'admin'

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center p-4 bg-white dark:bg-gray-800 gap-4 max-w-md mx-auto md:max-w-3xl lg:max-w-5xl">
        <SearchBar
          placeholder="Busca algo!"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Dropdown
          title="Categoria"
          options={['Todo', ...categorias.map((categoria) => categoria.nombre)]}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <Dropdown
          title="Precio"
          options={['Todo', 'Ascendente', 'Descendente']}
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        {isAdmin && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={redirigirPagina}
          >
            Añadir
          </button>
        )}
      </div>
      {medallas.length > 0 ? (
        <ListMedallas medallas={medallas} />
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No se encontraron medallas con los criterios seleccionados.
        </div>
      )}
    </>
  )
}
