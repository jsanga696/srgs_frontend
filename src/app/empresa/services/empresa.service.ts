import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/dto/empresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private api = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  listarEmpresas() {
    let url = `${this.api}/empresas`;

    return this.http.get<Empresa[]>(url);

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
