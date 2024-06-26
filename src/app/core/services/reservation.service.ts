import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


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

  getReservations(pageNumber: number, pageSize: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  showMessage(success: boolean, message: string): void {
    if (success) {
      this.msg.success(message);
    } else {
      this.msg.error(message);
    }
  }

}
