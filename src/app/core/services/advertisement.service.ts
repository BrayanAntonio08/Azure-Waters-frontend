import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertisement } from '../models/Advertisment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private url:string = "http://localhost:7119/api/Anuncio"

  constructor(private http: HttpClient) { }

  listAdds(): Promise<Advertisement[]>{
    return new Promise<Advertisement[]>((resolve) => {
      this.http.get<Advertisement[]>(this.url).subscribe((value => resolve(value)))
    })
  }

  createAd(advertisement: Advertisement): Promise<Advertisement>{
    return new Promise<Advertisement>((resolve)=>{
      this.http.post<Advertisement>(this.url, advertisement).subscribe(value => resolve(value))
    })
  }

  updateAd(advertisement: Advertisement): Promise<Advertisement>{
    return new Promise<Advertisement>((resolve)=>{
      this.http.put<Advertisement>(this.url, advertisement).subscribe(value => resolve(value))
    })
  }

  deleteAd(advertisement: Advertisement):Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.http.delete<boolean>(this.url, {body: advertisement}).pipe(
        catchError(err =>{
          resolve(false);
          throw err;
        })
      ).subscribe(value =>{
        resolve(value);
      })
    });
  }
}
