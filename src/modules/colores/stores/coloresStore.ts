/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from '@/modules/shared/constants/creacionType'
import { parseColor } from '@/modules/shared/logic/parseColor'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ColoresStore = {
  colores: Color[]
  fetchColores: () => void
}

export const useColoresStore = create<ColoresStore>()(
  persist(
    (set) => ({
      colores: [],
      fetchColores: () => {
        fetch('/api/colores')
          .then((response) => response.json())
          .then((data) => {
            const coloresNuevos = data.map((color: any) => parseColor(color))
            set({ colores: coloresNuevos })
          })
      },
    }),
    { name: 'colores-store' }
  )
)
