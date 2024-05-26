import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facilidad } from '../models/Facilities';
import { Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  private url: string;

  constructor(private http: HttpClient, private msg:ToastrService) {
    this.url = "http://localhost:7119/api/Facilidad";
  }

  getFacilities(): Observable<Facilidad[]> {
    return this.http.get<Facilidad[]>(this.url);
  }

  updateFacility(facility:Facilidad): Promise<Facilidad>{
    return new Promise<Facilidad>((resolve, reject) =>{
      this.http.put<Facilidad>(this.url, facility).pipe(
        catchError(error =>{
          this.msg.error("Fallo al actualizar el elemento");
          reject(error);
          throw error;
        })
      ).subscribe((value:Facilidad)=>{
        this.msg.success("Item actualizado correctamente");
        resolve(value);
      })
    });
  }
}
