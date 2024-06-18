import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../models/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private url: string = 'http://localhost:7119/api/Oferta';

  constructor(private http: HttpClient) { }

  list(): Promise<Offer[]>{
    return new Promise((resolve)=>{
      this.http.get<Offer[]>(this.url).subscribe(
        (value) => resolve(value)
      )
    })
  }

  create(offer: Offer): Promise<Offer>{
    return new Promise((resolve)=>{
      this.http.post<Offer>(this.url, offer).subscribe(
        (value) => resolve(value)
      )
    });
  }

  update(offer: Offer): Promise<Offer>{
    return new Promise((resolve)=>{
      this.http.put<Offer>(this.url, offer).subscribe(
        (value) => resolve(value)
      )
    });
  }

  delete(id: number): Promise<boolean>{
    return new Promise((resolve)=>{
      this.http.delete<boolean>(`${this.url}/${id}`).subscribe(
        (value) => resolve(value)
      )
    });
  }
}
