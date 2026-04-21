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
}
