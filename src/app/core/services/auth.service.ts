import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Temporada } from '../models/season'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  active: boolean = false;
  private url: string = "";
  private url2: string = "";

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Usuarios";
    this.url2 = "http://localhost:7119/api/Temporada";
  }

  login(data: any): Observable<Login> {
    console.log(data);
    return this.http.post<Login>("http://localhost:7119/api/Usuarios/buscarUsuario?usuario=" + data.usuario + "&contrasenna=" + data.contrasenna, data);
  }

  isAdminActive(): boolean {
    console.log(sessionStorage.getItem("id"));

    return sessionStorage.getItem("id") !== null;
  }

  getTemporada(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(this.url2);
  }

  logout(): void {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('contrasenna');
  }
}