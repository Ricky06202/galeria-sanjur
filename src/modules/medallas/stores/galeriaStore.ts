import { GaleriaCreacion } from '@/modules/shared/constants/creacionType'
import { parseGaleriaCreacion } from '@/modules/shared/logic/parseGaleriaCreacion'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type GaleriaStore = {
  galeria: GaleriaCreacion[]
  fetchGaleria: (id: string) => void
}

export const useGaleriaStore = create<GaleriaStore>()(
  persist(
    (set) => ({
      galeria: [],
      fetchGaleria: (id: string) => {
        fetch(`/api/galeria_creaciones/${id}`) 
          .then((response) => response.json())
          .then((data) => {
            const galeriaNuevas = data.map((galeria: any) =>
              parseGaleriaCreacion(galeria)
            )
            set({ galeria: galeriaNuevas })
          })
      },
    }),
    { name: 'galeria-store' }
  )
)