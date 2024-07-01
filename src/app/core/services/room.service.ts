import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType } from '../models/RoomType';
import { Room } from '../models/Room';
import { catchError, Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url: string = "";

  constructor(private http: HttpClient) {
    this.url = "http://localhost:7119/api/Habitacion";
  }

  ListRoomTypes(): Promise<RoomType[]> {
    return new Promise<RoomType[]>((resolve, reject) => {
      this.http.get<RoomType[]>(`${this.url}/tipos`).subscribe((data: RoomType[]) => {
        resolve(data);
      });
    });
  }

  ListRooms(): Promise<Room[]> {
    return new Promise<Room[]>((resolve, reject) => {
      this.http.get<Room[]>(`${this.url}/list`).subscribe((data: Room[]) => {
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


  //NUEVA PARA LA DISPONIBILIDAD DE HABITACIONES
  getDisponibilidad(fechaInicio: string, fechaFin: string, idTipo: number): Observable<Room[]> {
    console.log('fecha', fechaInicio, ' a ', fechaFin, 'tipo ', idTipo);

    // Construir la URL con los parámetros directamente
    const url = `${this.url}/disponibilidad?fecha_inicio=${fechaInicio}&fecha_final=${fechaFin}&id_tipo=${idTipo}`;

    console.log('DISPONIBILIDAD Service', this.http.get<Room[]>(url));

    return this.http.get<Room[]>(url);
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

  ConsultarDisponibilidadHabitaciones(fecha_inicio:string , fecha_fin:string, id_tipo:number): Observable<Room[]> {
    const params= new HttpParams()
    .set('fecha_inicio', fecha_inicio)
    .set('fecha_fin', fecha_fin)
    .set('id_tipo', id_tipo.toString());
    console.log('service consultar', this.http.get<Room[]>(`${this.url}/disponibilidad`,{params}));
    return this.http.get<Room[]>(`${this.url}/disponibilidad`,{params});
  }


  /*ConsultarDisponibilidadHabitaciones(fecha_inicio: string, fecha_fin: string, id_tipo: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/HabitacionConsultarDisponibilidadHabitaciones`, {
      params: {
        fecha_inicio,
        fecha_fin,
        id_tipo: id_tipo.toString()
      }
    });
  }*/
}


