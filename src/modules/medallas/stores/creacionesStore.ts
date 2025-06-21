import { Creacion } from '@/modules/shared/constants/creacionType'
import { parseCreacion } from '@/modules/shared/logic/parseCreacion'
import { create } from 'zustand'

type CreacionesStore = {
  creaciones: Creacion[]
  creacionesFiltradas: Creacion[]
  fetchCreaciones: () => void
  filtrarBusqueda: (busqueda: string) => void
  filtrarCategoria: (categoria: string) => void
  filtrarPrecio: (precio: string) => void
  filtroReset: () => void
}

export const useCreacionesStore = create<CreacionesStore>()((set) => ({
  creaciones: [],
  creacionesFiltradas: [],

  fetchCreaciones: () => {
    fetch('/api/creaciones')
      .then((response) => response.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nuevasMedallas: Creacion[] = data.map((medalla: any) =>
          parseCreacion(medalla)
        )
        set({ creaciones: nuevasMedallas })
        set({ creacionesFiltradas: [...nuevasMedallas] })
      })
  },

  filtrarBusqueda: (busqueda) => {
    set((state) => ({
      creacionesFiltradas: state.creacionesFiltradas.filter((medalla) =>
        medalla.nombre.toLowerCase().includes(busqueda.toLowerCase())
      ),
    }))
  },

  filtrarCategoria: (categoria) => {
    set((state) => ({
      creacionesFiltradas:
        categoria === 'Todo'
          ? state.creacionesFiltradas
          : state.creacionesFiltradas.filter((medalla) =>
              medalla.Categoria.nombre.includes(categoria)
            ),
    }))
  },

  filtrarPrecio: (precio) => {
    set((state) => ({
      creacionesFiltradas: state.creacionesFiltradas.sort((a, b) => {
        if (precio === 'Ascendente') {
          return a.precio - b.precio // Ascendente
        } else if (precio === 'Descendente') {
          return b.precio - a.precio // Descendente
        }
        return 0 // Sin cambio si no se especifica precio
      }),
    }))
  },

  filtroReset: () => {
    set((state) => ({
      creacionesFiltradas: [...state.creaciones],
    }))
  },
}))
