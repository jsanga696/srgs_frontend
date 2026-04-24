import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../dto/usuario';
import { PageResponse } from 'src/app/dto/page_response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }


  listarUsuarios(page: number, size: number, nombres?: string) {
    let url = `${this.api}/usuarios?page=${page}&size=${size}`;

    if (nombres) {
      url += `&nombres=${nombres}`;
    }

     return this.http.get<PageResponse<Usuario>>(url)
          .pipe(
            map(resp => resp.data)
          );
  }

  guardarUsuario(data: Usuario) {
    return this.http.post(`${this.api}/usuarios`, data);
  }

}
