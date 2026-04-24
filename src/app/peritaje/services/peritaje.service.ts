import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from 'src/app/dto/page_response';
import { Peritaje } from 'src/app/dto/peritaje';
import { Vehiculo } from 'src/app/dto/vehiculo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeritajeService {

  private api = environment.apiUrl;
      
    constructor(private http: HttpClient) { }
    
  
    listarPeritajes(page: number, size: number) {
      let url = `${this.api}/peritajes?page=${page}&size=${size}`;
  
      return this.http.get<PageResponse<Peritaje>>(url);
  
    }
  
    obtenerPorId(id: string){
      return this.http.get<Peritaje>(`${this.api}/peritajes/${id}`);
    }
  
    crear(data: Peritaje) {
      return this.http.post(`${this.api}/peritajes`, data);
    }

    guardar(formData: FormData) {
      return this.http.post(`${this.api}/peritajes/multipart`, formData);
    }
  
    actualizar(id: string, data: any) {
      return this.http.put(`${this.api}/peritajes/${id}`, data);
    }
  
    buscarPerito(id: string){
      return this.http.get<Peritaje>(`${this.api}/peritajes/${id}`);
    }
  
    buscarPlaca(placa: string){
      return this.http.get<Vehiculo>(`${this.api}/vehiculos/placa/${placa}`);
    }
  
    buscarAsegurado(id: string){
      return this.http.get<Peritaje>(`${this.api}/peritajes/${id}`);
    }
}
