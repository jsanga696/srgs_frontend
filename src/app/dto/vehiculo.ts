import { Asegurado } from "./asegurado";
import { CitacionVehiculo } from "./citacion_vehiculo";

export interface Vehiculo {

  placa: string;
  marca: string;
  color: string;
  modelo: string;
  anio_fabricacion: string;
  fechaMatricula: string;
  fechaCaducidad: string;
  asegurado: Asegurado;
  citaciones: CitacionVehiculo[];
  
}