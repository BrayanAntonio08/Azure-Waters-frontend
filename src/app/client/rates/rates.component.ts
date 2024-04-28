
import { Component } from '@angular/core';
import { RoomType } from '../../core/models/RoomType';
import { RoomService } from '../../core/services/room.service';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent {
  roomTypes : RoomType[] = [];
  
  constructor(private roomService: RoomService){
    roomService.ListRoomTypes().then((value)=>{
      this.roomTypes = value;
    }).catch((error)=>{
      console.log(error);
    });
  }
}


