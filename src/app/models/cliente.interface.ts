import {Domicilio} from './domicilio.interface';

export interface Cliente{
  uid: string;
  email: string;
  role?: number;
  estado ?: number;
  nombre ?: string;
  telefono ?: number;
  photoURL ?: string;
  domicilio ?: Domicilio;
  online ?: boolean;
}
