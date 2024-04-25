import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/Page';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Pagina";
  }

  loadPage(title: string): Promise<Page> {
    return new Promise<Page>((resolve, reject) => {
      this.http.get<Page>(`${this.url}/${title}`).subscribe((data:Page)=>{
        resolve(data);
      })
    });
  }
}
