'use client'
import { ListColores } from '@/modules/colores/components/ListColores'
import { useColoresStore } from '@/modules/colores/stores/coloresStore'
import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { useMarcasStore } from '@/modules/colores/stores/marcasStore'
import { Dropdown } from '@/modules/shared/components/Dropdown'
import { SearchBar } from '@/modules/shared/components/SearchBar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ColoresPage() {
  const [busqueda, setBusqueda] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [disponibilidad, setDisponibilidad] = useState<string>('')
  const [tipo, setTipo] = useState<string>('')

  const filamentos = useFilamentosStore((state) => state.filamentosFiltrados)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)

  const marcas = useMarcasStore((state) => state.marcas)
  const fetchMarcas = useMarcasStore((state) => state.fetchMarcas)

  const filtrarBusqueda = useFilamentosStore((state) => state.filtrarBusqueda)
  const filtrarColor = useFilamentosStore((state) => state.filtrarColor)
  const filtrarMarca = useFilamentosStore((state) => state.filtrarMarca)
  const filtrarDisponibilidad = useFilamentosStore(
    (state) => state.filtrarDisponibilidad
  )
  const filtroReset = useFilamentosStore((state) => state.filtroReset)

  const colores = useColoresStore((state) => state.colores)
  const fetchColores = useColoresStore((state) => state.fetchColores)

  useEffect(() => {
    fetchFilamentos()
    fetchColores()
    fetchMarcas()
  }, [])

  useEffect(() => {
    filtroReset()
    filtrarBusqueda(busqueda)
    filtrarColor(color)
    filtrarMarca(tipo)
    filtrarDisponibilidad(disponibilidad)
  }, [busqueda, color, tipo, disponibilidad])

  const redirigirPagina = () => {
    redirect('/colores/nuevo')
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
          title="Filtrar por Color"
          options={['Todo', ...colores.map((color) => color.nombre)]}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Dropdown
          title="Filtrar por Tipo"
          options={['Todo', ...marcas.map((marca) => marca.nombre)]}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <Dropdown
          title="Disponibilidad"
          options={['Todo', 'Ascendente', 'Descendente']}
          value={disponibilidad}
          onChange={(e) => setDisponibilidad(e.target.value)}
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
      {filamentos.length > 0 ? (
        <ListColores colores={filamentos} />
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No se encontraron colores con los criterios seleccionados.
        </div>
      )}
    </>
  )
}
