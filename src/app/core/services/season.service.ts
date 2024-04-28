import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temporada } from '../models/season'

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private url: string = "";

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Temporada";
  }

  getTemporada(): Observable<Temporada[]> {
    return this.http.get<Temporada[]>(this.url);
  }

  deleteTemporada(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  addTemporada(temporadaData: Temporada): Observable<any> {
    return this.http.post<any>(this.url, temporadaData);
  }

  updateTemporada(temporadaData: Temporada): Observable<any> {
    return this.http.put<any>(`${this.url}/${temporadaData.idTemporada}`, temporadaData);
  }
}