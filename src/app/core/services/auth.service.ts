import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  active: boolean = false;

  constructor() { }

  login(){
    this.active = true;
  }

  isAdminActive():boolean{
    return this.active;
  }
}
