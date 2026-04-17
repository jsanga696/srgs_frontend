import { Empresa } from "./empresa";
import { Vehiculo } from "./vehiculo";

export interface Asegurado {

  id: string;
  ruc?: string;
  identificacion: string;
  nombres: string;
  pais: string;
  provincia: string;
  ciudad: string;
  direccion?: string;
  telefono?: string;
  celular?: string;
  email?: string;  
  activo: boolean;
  esPersonaNatural: boolean;
  fecha_ingreso?: Date;

  vehiculos: Vehiculo[];
  empresa: Empresa;

}