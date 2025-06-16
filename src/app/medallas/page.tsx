/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ListMedallas } from '@/modules/medallas/components/ListMedallas'
import { useCategoriasStore } from '@/modules/medallas/stores/categoriasStore'
import { useMedallasStore } from '@/modules/medallas/stores/medallasStore'
import { Dropdown } from '@/modules/shared/components/Dropdown'
import { SearchBar } from '@/modules/shared/components/SearchBar'
import { useState, useEffect } from 'react'

export default function MedallasPage() {
  const [categoria, setCategoria] = useState<string>('')
  const [precio, setPrecio] = useState<string>('')
  const [busqueda, setBusqueda] = useState<string>('')

  const medallas = useMedallasStore((state) => state.medallasFiltradas)
  
  const fetchMedallas = useMedallasStore((state) => state.fetchMedallas)
  const filtroReset = useMedallasStore((state) => state.filtroReset)
  const filtrarBusqueda = useMedallasStore((state) => state.filtrarBusqueda)
  const filtrarCategoria = useMedallasStore((state) => state.filtrarCategoria)
  const filtrarPrecio = useMedallasStore((state) => state.filtrarPrecio)

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

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 gap-4">
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
      </div>
      {medallas.length > 0 ? (
        <ListMedallas medallas={medallas} />
      ) : (
        <div className="flex justify-center items-center mt-10">
          <p>No hay medallas disponibles</p>
        </div>
      )}
    </>
  )
}
