import { Creacion } from '@/modules/shared/constants/creacionType'
import { parseCreacion } from '@/modules/shared/logic/parseCreacion'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MedallasStore = {
  medallas: Creacion[]
  medallasFiltradas: Creacion[]
  fetchMedallas: () => void
  filtrarBusqueda: (busqueda: string) => void
  filtrarCategoria: (categoria: string) => void
  filtrarPrecio: (precio: string) => void
  filtroReset: () => void
}

export const useMedallasStore = create<MedallasStore>()(
  persist(
    (set) => ({
      medallas: [],
      medallasFiltradas: [],

      fetchMedallas: () => {
        fetch('/api/creaciones')
          .then((response) => response.json())
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((data: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nuevasMedallas: Creacion[] = data.map((medalla: any) =>
              parseCreacion(medalla)
            )
            set({ medallas: nuevasMedallas })
          })
      },

      filtrarBusqueda: (busqueda) => {
        set((state) => ({
          medallasFiltradas: state.medallasFiltradas.filter((medalla) =>
            medalla.nombre.toLowerCase().includes(busqueda.toLowerCase())
          ),
        }))
      },

      filtrarCategoria: (categoria) => {
        set((state) => ({
          medallasFiltradas:
            categoria === 'Todo'
              ? state.medallasFiltradas
              : state.medallasFiltradas.filter((medalla) =>
                  medalla.Categoria.nombre.includes(categoria)
                ),
        }))
      },

      filtrarPrecio: (precio) => {
        set((state) => ({
          medallasFiltradas: state.medallasFiltradas.sort((a, b) => {
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
          medallasFiltradas: [...state.medallas],
        }))
      },
    }),
    { name: 'medallas-storage' }
  )
)
