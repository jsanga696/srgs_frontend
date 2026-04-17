import { CitacionVehiculo } from "./citacion_vehiculo";

export interface Vehiculo {

  placa: string;
  marca: string;
  color: string;
  modelo: string;
  anio: string;
  fechaMatricula: string;
  fechaCaducidad: string;
  citaciones: CitacionVehiculo[];
  
}