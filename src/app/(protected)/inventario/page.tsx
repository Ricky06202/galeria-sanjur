'use client'
import React, { useEffect } from 'react'
import { useFilamentosStore } from '@/modules/colores/stores/filamentosStore'
import { Filamento } from '@/modules/shared/constants/filamentoType'
import SmallProductList from '@/modules/inventario/components/SmallProductList'
import BigProductList from '@/modules/inventario/components/BigProductList'
import { SearchBar } from '@/modules/shared/components/SearchBar'
import ToggleButton from '@mui/material/ToggleButton'
import { Dropdown } from '@/modules/shared/components/Dropdown'
import { useColoresStore } from '@/modules/colores/stores/coloresStore'
import { useMarcasStore } from '@/modules/colores/stores/marcasStore'

export default function Page() {
  const filamentos = useFilamentosStore((state) => state.filamentosFiltrados)
  const [sortedFilamentos, setSortedFilamentos] =
    React.useState<Filamento[]>(filamentos)
  const fetchFilamentos = useFilamentosStore((state) => state.fetchFilamentos)

  const [sortMarca, setSortMarca] = React.useState<'asc' | 'desc' | 'none'>(
    'none'
  )
  const [sortGramos, setSortGramos] = React.useState<'asc' | 'desc' | 'none'>(
    'none'
  )

  const [viewMode, setViewMode] = React.useState<'small' | 'big'>('small')

  useEffect(() => {
    fetchFilamentos()
  }, [])

  useEffect(() => {
    const newSortedFilamentos = [...filamentos]

    if (sortMarca !== 'none') {
      newSortedFilamentos.sort((a, b) => {
        if (sortMarca === 'asc') {
          return a.Marca?.nombre.localeCompare(b.Marca?.nombre)
        } else {
          return b.Marca?.nombre.localeCompare(a.Marca?.nombre)
        }
      })
    } else if (sortGramos !== 'none') {
      if (sortGramos === 'asc') {
        newSortedFilamentos.sort((a, b) => a.gramos - b.gramos)
      } else {
        newSortedFilamentos.sort((a, b) => b.gramos - a.gramos)
      }
    } else {
      // Ordenamiento por defecto (por ID)
      newSortedFilamentos.sort((a, b) => a.id - b.id)
    }

    setSortedFilamentos(newSortedFilamentos)
  }, [sortMarca, sortGramos, filamentos])

  const [searchValue, setSearchValue] = React.useState('')
  const [filterColor, setFilterColor] = React.useState('')
  const [filterType, setFilterType] = React.useState('')

  useEffect(() => {
    filtroReset()
    filtrarBusqueda(searchValue)
    filtrarColor(filterColor)
    filtrarMarca(filterType)
    setSortedFilamentos(filamentos)
  }, [searchValue, filterColor, filterType])

  const filtrarBusqueda = useFilamentosStore((state) => state.filtrarBusqueda)
  const filtrarColor = useFilamentosStore((state) => state.filtrarColor)
  const filtrarMarca = useFilamentosStore((state) => state.filtrarMarca)
  const filtroReset = useFilamentosStore((state) => state.filtroReset)

  useEffect(() => {}, [searchValue, filterColor, filterType])

  const colores = useColoresStore((state) => state.colores)
  const tipos = useMarcasStore((state) => state.marcas)

  return (
    <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={searchValue}
          placeholder="Busca por color, tipo o nombre"
          onChange={(value) => {
            setSearchValue(value.target.value)
          }}
        />
        <Dropdown
          value={filterColor}
          title="Filtrar por color"
          options={['Todo', ...colores.map((color) => color.nombre)]}
          onChange={(value) => {
            setFilterColor(value.target.value)
          }}
        />
        <Dropdown
          title="Filtrar por tipo"
          options={['Todo', ...tipos.map((tipo) => tipo.nombre)]}
          value={filterType}
          onChange={(value) => {
            setFilterType(value.target.value)
          }}
        />
        <Dropdown
          value={
            sortGramos === 'asc'
              ? 'Asc'
              : sortGramos === 'desc'
              ? 'Desc'
              : 'none'
          }
          title={`Ordenar por gramos (${sortGramos})`}
          options={['Desordenado', 'Asc', 'Desc']}
          onChange={(value) => {
            setSortGramos(
              value.target.value === 'Desordenado'
                ? 'none'
                : value.target.value === 'Asc'
                ? 'asc'
                : 'desc'
            )
          }}
        />
        <ToggleButton
          value={viewMode === 'small'}
          selected={viewMode === 'small'}
          onChange={() => {
            setViewMode(viewMode === 'small' ? 'big' : 'small')
          }}
        >
          {viewMode === 'small' ? 'Vista pequeña' : 'Vista grande'}
        </ToggleButton>
      </div>

      {viewMode === 'small' ? (
        <SmallProductList
          sortedFilamentos={sortedFilamentos}
          sortMarca={sortMarca}
          sortGramos={sortGramos}
          setSortMarca={setSortMarca}
          setSortGramos={setSortGramos}
        />
      ) : (
        <BigProductList sortedFilamentos={sortedFilamentos} />
      )}
    </div>
  )
}
