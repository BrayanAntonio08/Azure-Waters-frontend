import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType } from '../models/RoomType';
import { Room } from '../models/Room';
import { catchError, Observable } from 'rxjs';


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
}


