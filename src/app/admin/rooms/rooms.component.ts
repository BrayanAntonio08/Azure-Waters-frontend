import { Component } from '@angular/core';
import { RoomType } from '../../core/models/RoomType';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  activeRoomType : number = 1;
  roomTypes : RoomType[] = [];
  rooms : any[] = [];
  displayRooms: any[] = [];

  constructor(){
    this.roomTypes = [
      {
        id:1,
        name:"Nombre 1",
        price: 12.3,
        description:"Una buena habitacion"
      },
      {
        id:2,
        name:"Nombre 2",
        price: 12.3,
        description:"Una buena habitacion"
      },
      {
        id:3,
        name:"Nombre 3",
        price: 12.3,
        description:"Una buena habitacion"
      },
    ]
    this.rooms = [
      {
        number: 1,
        type_id: 1
      },{
        number: 2,
        type_id: 1
      },{
        number: 3,
        type_id: 2
      },{
        number: 4,
        type_id: 1
      },{
        number: 5,
        type_id: 2
      },{
        number: 6,
        type_id: 2
      },{
        number: 7,
        type_id: 3
      },{
        number: 8,
        type_id: 3
      },
    ]
    this.displayRooms = this.rooms.filter(x => x.type_id === this.activeRoomType)
  } //fin constructor

  changeRoomType(id:number){
    this.activeRoomType = id;
    this.displayRooms = this.rooms.filter(x => x.type_id === this.activeRoomType)
  }
}
