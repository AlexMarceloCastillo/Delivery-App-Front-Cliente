import { Domicilio } from "./domicilio.interface";

export interface Pedido {
    _id ?: any,
    fecha: Date,
    estado: any,
    horaEstimadaFin: number,
    tipoEnvio: number,
    total: number,
    Cliente: {
        firebase_id : string,
        Domicilio ?: Domicilio
    },
    DetallePedido ?: [
        {
            cantidad: number,
            subTotal: number,
            ArtManufact ?: {
                _id: any
            },
            ArticuloInsumo ?: {
                _id: any
            }
        }
    ],
    active?: boolean,
}