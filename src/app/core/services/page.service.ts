import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/Page';
import { Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private url: string;

  constructor(private http: HttpClient, private msg: ToastrService) {
    this.url = "http://localhost:7119/api/Pagina";
  }

  loadPage(title: string): Promise<Page> {
    return new Promise<Page>((resolve, reject) => {
      this.http.get<Page>(`${this.url}/${title}`).pipe(
        catchError((error) =>{
          this.msg.error("No se ha podido cargar los datos de la página");
          reject(error);
          throw error;
        })
      ).subscribe((data:Page)=>{
        resolve(data);
      })
    });
  }
}
