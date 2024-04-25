import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType } from '../models/RoomType';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url: string = "http://localhost:7119/api/Habitacion";
  constructor(private http: HttpClient) { }

  ListRoomTypes(): Promise<RoomType[]>{
    return new Promise<RoomType[]>((resolve, reject) => {
      this.http.get<RoomType[]>(`${this.url}/tipos`).subscribe((data: RoomType[]) => {
        resolve(data);
      });
    });
  }

  ListRooms(): Promise<Room[]>{
    return new Promise<Room[]>((resolve, reject) => {
      this.http.get<Room[]>(`${this.url}/list`).subscribe((data: Room[]) => {
        resolve(data);
      });
    });
  }
}
