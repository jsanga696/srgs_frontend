import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../../dto/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }


  listarVehiculos(page: number, size: number, placa?: string) {
    let url = `${this.api}/vehiculos?page=${page}&size=${size}`;

    if (placa) {
      url += `&placa=${placa}`;
    }

    return this.http.get<Vehiculo[]>(url);
  }

  consultarPorPlaca(placa: string) {
    
    return this.http.get<Vehiculo>(`${this.api}/playwright/atm/${placa}`);
  }

  guardarVehiculo(data: Vehiculo) {
    return this.http.post(`${this.api}/vehiculos`, data);
  }

}
