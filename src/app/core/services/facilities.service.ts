import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facilidad } from '../models/Facilities';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  private url: string;  

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Facilidad";
  }

  loadFacilities(facilidadId: string): Promise<Facilidad> {
    return new Promise<Facilidad>((resolve, reject) => {
      this.http.get<Facilidad>(`${this.url}/${facilidadId}`).subscribe((data:Facilidad)=>{
        resolve(data);
      })
    });
  }
}
