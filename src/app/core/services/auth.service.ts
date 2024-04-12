import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  active: boolean = false;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<Login> {
    console.log(data);
    return this.http.post<Login>("http://localhost:7119/api/Usuarios/buscarUsuario?usuario=" + data.usuario + "&contrasenna=" + data.contrasenna, data);
  }

  isAdminActive(): boolean {
    return this.active;
  }
}