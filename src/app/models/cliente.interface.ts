export interface Cliente{
  uid: string;
  email: string;
  estado ?: number;
  nombre ?: string;
  apellido ?: string;
  telefono ?: number;
  photoURL ?: string;
  domicilio ?: Domicilio;
}

export interface Domicilio {
  calle: string,
  numero: number,
  localidad: string
}
