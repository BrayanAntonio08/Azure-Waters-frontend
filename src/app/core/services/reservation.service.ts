import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url : string = "http://localhost:7119/api/Reserva";

  constructor(private http: HttpClient, private msg: ToastrService) { }

  create(reservation: Reservation): Promise<Reservation>{
    return new Promise<Reservation>(
      (resolve, reject) => {
        this.http.post<Reservation>(this.url, reservation)
        .subscribe(value =>{
          this.msg.success("Se ha creado la reserva exitosamente");
          resolve(value);
        })
      }
    );
  }
}
