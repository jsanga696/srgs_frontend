import { Injectable } from '@angular/core';
import { Cliente } from '../../dto/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private api = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Cliente[]>(this.api);
  }

  create(cliente: Cliente) {
    return this.http.post(this.api, cliente);
  }

  update(id: number, cliente: Cliente) {
    return this.http.put(`${this.api}/${id}`, cliente);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  
}
