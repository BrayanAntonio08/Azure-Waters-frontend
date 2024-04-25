import { Component } from '@angular/core';
import { RoomType } from '../../core/models/RoomType';
import { NgClass } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/Room';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  state: string = "";
  activeRoomType : number = 1;
  roomTypes : RoomType[] = [];
  rooms : Room[] = [];
  displayRooms: Room[] = [];

  editingRoomType: RoomType | undefined = new RoomType();

  constructor(private roomService: RoomService){
    roomService.ListRoomTypes().then((value) => (this.roomTypes = value));
    roomService.ListRooms().then((value) => {
      this.rooms = value;
      this.displayRooms = this.rooms.filter(
        (x) => x.type_id === this.activeRoomType
      );
    });
  } //fin constructor

  changeRoomType(id:number){
    this.activeRoomType = id;
    this.displayRooms = this.rooms.filter(x => x.type_id === this.activeRoomType)
  }

  openUpdateRoomTypeForm(){
    this.editingRoomType = this.roomTypes.find(item => item.id = this.activeRoomType);
    this.state = "editingRoomType";
  }
}
