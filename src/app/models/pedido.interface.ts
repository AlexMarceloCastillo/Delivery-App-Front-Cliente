import { Domicilio } from "./domicilio.interface";

export interface Pedido {
    _id ?: any,
    fecha: Date,
    estado: any,
    horaEstimadaFin: number,
    tipoEnvio: number,
    total: number,
    accepted ?: Date,
    canceled : {
      fecha: Date,
      motivo: String
    } ,
    MdoPago ?: {
      _id: any
    },
    Cliente: {
        firebase_id : string,
        Domicilio ?: Domicilio
    },
    Factura: any,
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
