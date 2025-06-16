"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import { ListColores } from '@/modules/colores/components/ListColores'
import { useColoresStore } from '@/modules/colores/stores/coloresStore'
import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { Dropdown } from '@/modules/shared/components/Dropdown'
import { SearchBar } from '@/modules/shared/components/SearchBar'
import { useEffect, useState } from 'react'

export default function ColoresPage() {
  const [busqueda, setBusqueda] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [disponibilidad, setDisponibilidad] = useState<string>('')

  const filamentos = useFilamentosStore((state) => state.filamentosFiltrados)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)

  const filtrarBusqueda = useFilamentosStore(state => state.filtrarBusqueda)
  const filtrarColor = useFilamentosStore(state => state.filtrarColor)
  const filtrarDisponibilidad = useFilamentosStore(state => state.filtrarDisponibilidad)
  const filtroReset = useFilamentosStore(state => state.filtroReset)

  const colores = useColoresStore(state => state.colores)
  const fetchColores = useColoresStore(state => state.fetchColores)

  useEffect(() => {
    fetchFilamentos()
    fetchColores()
  }, [])

  useEffect(() => {
    filtroReset()
    filtrarBusqueda(busqueda)
    filtrarColor(color)
    filtrarDisponibilidad(disponibilidad)
  }, [busqueda, color, disponibilidad])

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 gap-4">
        <SearchBar
          placeholder="Busca algo!"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Dropdown
          title="Filtrar por Color"
          options={['Todo', ...colores.map(color => color.nombre)]}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Dropdown
          title="Disponibilidad"
          options={['Todo', 'Ascendente', 'Descendente']}
          value={disponibilidad}
          onChange={(e) => setDisponibilidad(e.target.value)}
        />
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
