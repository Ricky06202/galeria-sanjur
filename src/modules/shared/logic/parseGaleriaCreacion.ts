import { GaleriaCreacion } from "../constants/creacionType"

export const parseGaleriaCreacion = (galeriaCreacion: any): GaleriaCreacion => {
    return {
        id: galeriaCreacion.id,
        creaciones_id: galeriaCreacion.creaciones_id,
        imagen: galeriaCreacion.imagen,
    }
}