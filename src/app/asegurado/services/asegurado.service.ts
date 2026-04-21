import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asegurado } from '../../dto/asegurado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageResponse } from 'src/app/dto/page_response';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {

  private api = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  listarAsegurados(page: number, size: number, identificacion?: string) {
      let url = `${this.api}/asegurados?page=${page}&size=${size}`;
  
      if (identificacion) {
        url += `&identificacion=${identificacion}`;
      }
  
      return this.http.get<PageResponse<Asegurado>>(url);
    }
  
    consultarPorIdentificacion(identificacion: string) {
      return this.http.get<Asegurado>(`${this.api}/asegurados/${identificacion}`);
    }
  
    guardarAsegurado(data: Asegurado) {
      console.log(data)
      return this.http.post(`${this.api}/asegurados`, data);
    }

    actualizar(id: string, data: any) {
      return this.http.put(`${this.api}/asegurados/${id}`, data);
    }
}
