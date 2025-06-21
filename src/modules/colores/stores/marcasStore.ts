/* eslint-disable @typescript-eslint/no-explicit-any */
import { Marca } from '@/modules/shared/constants/filamentoType'
import { parseMarca } from '@/modules/shared/logic/parseMarca'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MarcasStore = {
  marcas: Marca[]
  fetchMarcas: () => void
}

export const useMarcasStore = create<MarcasStore>()(
  persist(
    (set) => ({
      marcas: [],
      fetchMarcas: () => {
        fetch('/api/marcas')
          .then((response) => response.json())
          .then((data) => {
            const marcasNuevos = data.map((marca: any) => parseMarca(marca))
            set({ marcas: marcasNuevos })
          })
      },
    }),
    { name: 'marcas-store' }
  )
)
