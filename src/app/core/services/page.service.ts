import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/Page';
import { Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Image } from '../models/Image';

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
        catchError((error) => {
          this.msg.error("No se ha podido cargar los datos de la página");
          reject(error);
          throw error;
        })
      ).subscribe((data: Page) => {
        resolve(data);
      })
    });
  }

  loadImages(title: string): Promise<Image[]> {
    return new Promise<Image[]>(
      (resolve, reject) => {
        this.http.get<Image[]>(`${this.url}/images/${title}`).pipe(
          catchError((error) => {
            this.msg.error("No se han podido cargar las imágenes de la página");
            reject(error);
            throw error;
          })
        ).subscribe((data) => {
          resolve(data);
        })
      });
  }

  modifyPage(page: Page){
    this.http.put(this.url, page).pipe(
      catchError((error) => {
        this.msg.error("Error al intentar actualizar los datos");
        throw error;
      })
    ).subscribe((data)=>{
      this.msg.success("Se ha actualizado exitosamente");
    })
  }
}
