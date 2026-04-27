import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from 'src/app/dto/page_response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, { username, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
