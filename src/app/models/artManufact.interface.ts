import { ArtInsumo } from "./artInsumo.interface";

export interface ArtManufacturado {
    _id: any,
    img: string,
    tiempoEstimado: number,
    denominacion: string,
    precioVenta: number,
    ArtManufactDet: [
        {
            cantidad: number,
            unidadMedida: string,
            // ArticuloInsumo
            ArtInsumo: ArtInsumo
        }
    ],
    RubroGeneral: RubroGeneral,
}

interface RubroGeneral {
    denominacion: string,
}