import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType } from '../models/RoomType';
import { Room, RoomDto } from '../models/Room';
import { Reservation } from '../models/Reservation';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url: string = "";

  constructor(private http: HttpClient, private msg: ToastrService) {
    this.url = "http://localhost:7119/api/Habitacion";
  }

  ListRoomTypes(): Promise<RoomType[]> {
    return new Promise<RoomType[]>((resolve, reject) => {
      this.http.get<RoomType[]>(`${this.url}/tipos`).pipe(
        catchError((err)=>{
          this.msg.error("Ha ocurrido un error al cargar los datos de las habitaciones");
          reject(err);
          throw err;
        })
      ).subscribe((data: RoomType[]) => {
        resolve(data);
      });
    });
  }

  ListRooms(): Promise<Room[]> {
    return new Promise<Room[]>((resolve, reject) => {
      this.http.get<Room[]>(`${this.url}/list`).pipe(
        catchError((err)=>{
          this.msg.error("Ha ocurrido un error al cargar las habitaciones");
          reject(err);
          throw err;
        })
      ).subscribe((data: Room[]) => {
        resolve(data);
      });
    });
  }

  UpdateRoomType(roomType: RoomType): Promise<void> {
    return this.http.put<void>(`${this.url}/tipos/${roomType.id}`, roomType).toPromise();
  }

  DeleteRoomType(id: number) {
    const confirm = window.confirm("¿Seguro que desea eliminar este tipo de habitación?");
    if (confirm) {

    }
  }

  getRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}/list`);
  }

  markActive(room:Room){
    this.http.put(this.url+"/activa", room);
  }

  createRoom(room:Room){
    return this.http.post(this.url+"/create", room);
  }

  updateRoom(id:number, room:Room){
    return this.http.put(this.url+"/update/"+id, room);
  }

  delete(id:number){
    return this.http.delete(this.url+"/delete/"+id);
  }

  getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${this.url}/list`);

  }

  ListarTiposHabitaciones():Observable<RoomType[]>{
    return this.http.get<RoomType[]>(`${this.url}/list`);
  }

  checkRoom(request: Reservation): Promise<any> {
    return new Promise((resolve) => {
      this.http.post<any>(`${this.url}/revisar`, request).
        subscribe(
          (value) => {
            console.log(value);
            resolve(value);
          }
        );
    });
  }

  finishRevision(id_room:number){
    this.http.delete(`${this.url}/liberar/${id_room}`).subscribe(res => console.log(res));
  }
 
    consultarDisponibilidad(fechaInicio: string, fechaFin: string, idTipoHabitacion?: number): Observable<RoomDto[]> {
      let params = new HttpParams()
        .set('fechaInicio', fechaInicio)
        .set('fechaFin', fechaFin);
      
      if (idTipoHabitacion !== undefined) {
        params = params.set('idTipoHabitacion', idTipoHabitacion.toString());
      }
  
      return this.http.get<RoomDto[]>(`${this.url}/disponibilidades`, { params });
    }
  }


