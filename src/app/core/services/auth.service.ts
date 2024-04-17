import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  active: boolean = true;
  private url: string = "";

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Usuarios";
  }

  login(data: any): Observable<Login> {
    console.log(data);
    return this.http.post<Login>("http://localhost:7119/api/Usuarios/buscarUsuario?usuario=" + data.usuario + "&contrasenna=" + data.contrasenna, data);
  }

  isAdminActive(): boolean {
    this.http.get(this.url).subscribe(data => {
      console.log(data);
    })
    return this.active;
  }

  logout(): void {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('contrasenna');
  }
}