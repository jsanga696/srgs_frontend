import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asegurado } from '../../dto/asegurado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {

  private api = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


}
