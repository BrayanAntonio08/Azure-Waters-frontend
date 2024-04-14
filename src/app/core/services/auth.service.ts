import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  active: boolean = true;
  private url: string;

  constructor(private http: HttpClient) { 
    this.url = "https://rickandmortyapi.com/api/character";
  }

  login(){
    this.active = true;
  }

  isAdminActive():boolean{
    this.http.get(this.url).subscribe((response: any) =>{
      console.log(response);
    })
    return this.active;
  }
}
