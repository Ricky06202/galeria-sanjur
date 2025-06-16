/* eslint-disable @typescript-eslint/no-explicit-any */
import { Categoria } from '@/modules/shared/constants/creacionType'
import { parseCategoria } from '@/modules/shared/logic/parseCategoria'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CategoriasStore = {
  categorias: Categoria[]
  fetchCategorias: () => void
}

export const useCategoriasStore = create<CategoriasStore>()(
  persist(
    (set) => ({
      categorias: [],
      fetchCategorias: () => {
        fetch('/api/categorias')
          .then((response) => response.json())
          .then((data) => {
            const categoriasNuevas = data.map((categoria: any) =>
              parseCategoria(categoria)
            )
            set({ categorias: categoriasNuevas })
          })
      },
    }),
    { name: 'categorias-store' }
  )
)
