import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/dto/empresa';
import { PageResponse } from 'src/app/dto/page_response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private api = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  listarEmpresas(page: number, size: number, identificacion?: string, nombres?: string, razon_social?: string) {
    let url = `${this.api}/empresas?page=${page}&size=${size}`;

    if (identificacion) {
      url += `&identificacion=${identificacion}`;
    }

    if (nombres) {
      url += `&nombres=${nombres}`;
    }

    if (razon_social) {
      url += `&razon_social=${razon_social}`;
    }

    console.log(url);
    return this.http.get<PageResponse<Empresa>>(url);

  }

  obtenerPorId(id: number){
    return this.http.get<Empresa>(`${this.api}/empresas/${id}`);
  }

  guardarEmpresa(data: Empresa) {
    return this.http.post(`${this.api}/empresas`, data);
  }

  actualizar(id: number, data: any) {
    return this.http.put(`${this.api}/empresas/${id}`, data);
  }
}
