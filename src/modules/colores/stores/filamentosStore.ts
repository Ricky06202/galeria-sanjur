/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filamento } from '@/modules/shared/constants/filamentoType'
import { parseFilamento } from '@/modules/shared/logic/parseFilamento'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type filamentosStore = {
  filamentos: Filamento[]
  filamentosFiltrados: Filamento[]
  fetchFilamentos: () => void
  filtrarBusqueda: (busqueda: string) => void
  filtrarColor: (color: string) => void
  filtrarDisponibilidad: (disponibilidad: string) => void
  filtroReset: () => void
}

export const useFilamentosStore = create<filamentosStore>()(
  persist(
    (set) => ({
      filamentos: [],
      filamentosFiltrados: [],
      fetchFilamentos: () => {
        fetch('/api/filamentos')
          .then((res) => res.json())
          .then((data) => {
            const nuevosColores: Filamento[] = data.map((filamento: any) =>
              parseFilamento(filamento)
            )
            set({ filamentos: nuevosColores })
          })
      },

      filtrarBusqueda: (busqueda) => {
        set((state) => ({
          filamentosFiltrados: state.filamentosFiltrados.filter((color) =>
            color.nombre.toLowerCase().includes(busqueda.toLowerCase())
          ),
        }))
      },

      filtrarColor: (color) => {
        set((state) => ({
          filamentosFiltrados:
            color === 'Todo'
              ? state.filamentosFiltrados
              : state.filamentosFiltrados.filter((colorf) =>
                  colorf.Color.nombre.includes(color)
                ),
        }))
      },

      filtrarDisponibilidad: (disponibilidad) => {
        set(state => ({
          filamentosFiltrados: state.filamentosFiltrados.sort((a,b) => {
            if (disponibilidad === 'Ascendente')
              return a.cantidad - b.cantidad
            else if (disponibilidad === 'Descendente')
              return b.cantidad - a.cantidad
            return 0
          })
        }))
      },

      filtroReset: () => {
        set((state) => ({
          filamentosFiltrados: [...state.filamentos],
        }))
      },
    }),
    { name: 'categorias-store' }
  )
)
