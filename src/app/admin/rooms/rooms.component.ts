import { Component } from '@angular/core';
import { RoomType } from '../../core/models/RoomType';
import { NgClass } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/Room';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../core/services/image.service';
import { Image } from '../../core/models/Image';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  state: string = "";
  activeRoomType : number = 1;
  roomTypes : RoomType[] = [];
  rooms : Room[] = [];
  displayRooms: Room[] = [];
  fileImg? : File;
  roomTypeImage : Image = new Image();

  editingRoomType: RoomType = new RoomType();

  constructor(private roomService: RoomService, private imageService: ImageService){
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
    let temp = this.roomTypes.find(item => item.id === this.activeRoomType);
    this.editingRoomType = temp? temp:this.editingRoomType;
    this.state = "editingRoomType";
  }

  cancelUpdateRoomType() {
    this.fileImg = undefined;
    this.roomTypeImage = new Image();
    this.editingRoomType = new RoomType();
    this.roomService.ListRoomTypes().then((value) => {
      this.roomTypes = value

      this.state = "";
    });
  }

  DeleteRoomType(){
    this.roomService.DeleteRoomType(this.activeRoomType);
  }

  uploadImage(){
    if(this.fileImg){
      console.log(this.fileImg);
      
      let imagen :Image = new Image();
      this.imageService.upload(this.fileImg).then((value) => {
        imagen = value;
        console.log(imagen);
      });
    }else{
      alert("No ha subido la imagen");
    }
  }

  selectFile(event: any){
    this.fileImg = event.target.files[0];
    if(this.fileImg){
      const reader = new FileReader();
      reader.onload = (e:any) =>{
        this.roomTypeImage.url = e.target.result;
      }
      reader.readAsDataURL(this.fileImg);    
    }
  }
}
