import { Domicilio } from './domicilio.interface';
import { Role } from "./role.interface";

export interface Cliente{
  uid: string;
  email: string;
  role?: Role;
  estado?: number;
  nombre?: string;
  telefono?: number;
  photoURL?: string;
  domicilio?: Domicilio;
  online?: boolean;
  provider?: string;
}