import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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

  addTemporada(temporadaData: Temporada): Promise<Temporada> {
    return new Promise<Temporada>((resolve, reject) =>{
      this.http.post<Temporada>(this.url, temporadaData).pipe(
        catchError(err=>{
        reject(err)
        throw err;
      })).subscribe(
        (value)=>{
          resolve(value)
        }
      );

    });
  }
  fixDateFormat(dateStr:string) {
    let parts = dateStr.split('-');
    if (parts.length === 2) {
      parts = parts.map(part => part.padStart(2, '0'));
      parts.reverse().push("2000");
      parts.reverse();
      return parts.join('-');
    }
    return dateStr;
  }

  async updateAll(temporadaData: Temporada[]): Promise<Temporada[]> {
    let formatTemp = temporadaData.map(temporada=>{
      return {...temporada,
        fechaFin:this.fixDateFormat(temporada.fechaFin),
        fechaInicio:this.fixDateFormat(temporada.fechaInicio)
      }
    })
    return new Promise<Temporada[]>((resolve, reject) =>{
      this.http.put<Temporada[]>(this.url+'/all', formatTemp).pipe(
        catchError(err=>{
        reject(err)
        throw err;
      })).subscribe(
        (value)=>{
          resolve(value)
        }
      );

    });
  }

  updateTemporada(temporadaData: Temporada): Observable<any> {
    return this.http.put<any>(`${this.url}/${temporadaData.id}`, temporadaData);
  }
}