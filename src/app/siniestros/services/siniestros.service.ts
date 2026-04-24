import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asegurado } from 'src/app/dto/asegurado';
import { PageResponse } from 'src/app/dto/page_response';
import { Siniestro } from 'src/app/dto/siniestro';
import { Vehiculo } from 'src/app/dto/vehiculo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiniestrosService {

  private api = environment.apiUrl;
    
  constructor(private http: HttpClient) { }
  

  listarSiniestros(page: number, size: number, codigo?: string, estado?: string) {
    let url = `${this.api}/siniestros?page=${page}&size=${size}`;

    if(codigo){
      url = url + `&codigo=${codigo}`;
    }

    if(estado){
      url = url + `&estado=${estado}`;
    }

    return this.http.get<PageResponse<Siniestro>>(url);
  }

  obtenerPorId(id: string){
    return this.http.get<Siniestro>(`${this.api}/siniestros/${id}`);
  }

  crear(data: Siniestro) {
    return this.http.post(`${this.api}/siniestros`, data);
  }

  actualizar(id: string, data: any) {
    return this.http.put(`${this.api}/siniestros/${id}`, data);
  }

  buscarPerito(id: string){
    return this.http.get<Siniestro>(`${this.api}/siniestros/${id}`);
  }

  buscarPlaca(placa: string){
    return this.http.get<Vehiculo>(`${this.api}/vehiculos/placa/${placa}`);
  }

  buscarAsegurado(id: string){
    return this.http.get<Asegurado>(`${this.api}/asegurados/${id}`);
  }
}
