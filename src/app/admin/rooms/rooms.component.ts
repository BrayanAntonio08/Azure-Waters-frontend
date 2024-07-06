import { Component } from '@angular/core';
import { RoomType } from '../../core/models/RoomType';
import { NgClass } from '@angular/common';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/Room';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../core/services/image.service';
import { Image } from '../../core/models/Image';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  state: string = "";
  activeRoomType: number = 1;
  roomTypes: RoomType[] = [];
  displayRoomsType?: RoomType = new RoomType();
  rooms: Room[] = [];
  displayRooms: Room[] = [];
  fileImg?: File;
  roomTypeImage: Image = new Image();

  editingRoomType: RoomType = new RoomType();
  nuevaHabitacion: Room = {
    id: 0,
    number: 0,
    type_id: 0,
    active: true,
    reserved: false,
    checking: true
  };

  editingRoom: Room = {
    id: 0,
    number: 0,
    type_id: 0,
    active: true,
    reserved: false,
    checking: true
  };

  constructor(private roomService: RoomService, private imageService: ImageService, private msg:ToastrService) {
    this.loadData();
  } //fin constructor

  async loadData(){
    this.roomTypes = await this.roomService.ListRoomTypes();
    this.roomService.ListRooms().then((value) => {
      this.rooms = value;
      this.changeRoomType(value[0].id);
    });
  }

  changeRoomType(id: number) {
    this.activeRoomType = id;
    this.displayRoomsType = this.roomTypes.find(x => x.id === id)
    this.displayRooms = this.rooms.filter(x => x.type_id === this.activeRoomType)
  }


  openUpdateRoomTypeForm() {
    let temp = this.roomTypes.find(item => item.id === this.activeRoomType);
    this.editingRoomType = temp ? temp : this.editingRoomType;
    this.roomTypeImage = temp?.image? temp.image: new Image();
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

  async updateRoomType() {
    //validar campos
    if(this.editingRoomType.name.length === 0 || this.editingRoomType.description.length === 0 || this.editingRoomType.price.toString().length === 0){
      this.msg.warning("Debe ingresar datos en todos los campos");
      return;
    }
    //validar dato numerico
    if(isNaN(parseFloat(this.editingRoomType.price.toString()))){
      this.msg.warning("El precio debe ser un valor numérico");
      return;
    }
    // validar la imagen
    if(this.roomTypeImage.id === 0){
      console.log("nueva imagern");
      if(!await this.uploadImage()){
        return;
      }
    }
    this.roomService.UpdateRoomType(this.editingRoomType).then(() => {
      this.msg.success("Tipo de habitación actualizado correctamente.");
      this.cancelUpdateRoomType();
      this.roomService.ListRoomTypes();
    }).catch(error => {
      this.msg.error("Error al actualizar tipo de habitación");
    });
  }

  DeleteRoomType() {
    this.roomService.DeleteRoomType(this.activeRoomType);
  }

  uploadImage() : Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
      if (this.fileImg) {
        this.imageService.upload(this.fileImg).then((value) => {
          this.editingRoomType.image = value;
          resolve(true);
        }).catch((err)=>{
          resolve(false);
        });
      } else {
        this.msg.warning("Debe ingresar un archivo valido");
        resolve(false);
      }
    });
  }

  selectFile(event: any) {
    this.fileImg = event.target.files[0];
    if (this.fileImg) {
      this.roomTypeImage = new Image();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.roomTypeImage.url = e.target.result;
      }
      reader.readAsDataURL(this.fileImg);
    }
  }

  markActive(room: Room){
    room.active = !room.active;
    this.roomService.markActive(room);
  }

  deleteRoom(id: number) {
    this.roomService.delete(id).subscribe(() => {
      this.msg.success("Habitación eliminada correctamente.");
      this.rooms = this.rooms.filter(room => room.id !== id);
      this.displayRooms = this.displayRooms.filter(room => room.id !== id);
    }, error => {
      this.msg.error("Error al eliminar la habitación");
      console.error("Error al eliminar la habitación:", error);
    });
  }

  openAddRoomModal(): void {
    const modal = document.getElementById('addRoomModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeAddRoomModal(): void {
    const modal = document.getElementById('addRoomModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  agregarHabitacion(): void {
    // validar el numero
    if(!this.nuevaHabitacion.number || this.nuevaHabitacion.number.toString().length === 0 || isNaN(parseFloat(this.nuevaHabitacion.number.toString()))){
      this.msg.warning("Procure insertar un valor válido para el número de habitación");
      return;
    }
    this.roomService.createRoom(this.nuevaHabitacion).subscribe(
      () => {
        this.msg.success("Habitación creada correctamente.");
        this.closeAddRoomModal();
        this.getRooms();
        this.nuevaHabitacion = {
          id: 0,
          number: 0,
          type_id: 0,
          active: true,
          reserved: false,
          checking: true
        };
      },
      (error) => {
        this.msg.error("Error al crear la habitación");
        console.error("Error al crear la habitación:", error);
      }
    );
  }

  openEditRoomModal(room: Room): void {
    this.editingRoom = { ...room };
    const modal = document.getElementById('editRoomModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeEditRoomModal(): void {
    const modal = document.getElementById('editRoomModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  actualizarHabitacion(): void {
    // validar el numero
    if(!this.editingRoom.number || this.editingRoom.number.toString().length === 0 || isNaN(parseFloat(this.editingRoom.number.toString()))){
      this.msg.warning("Procure insertar un valor válido para el número de habitación");
      return;
    }
    this.roomService.updateRoom(this.editingRoom.id, this.editingRoom).subscribe(
      () => {
        this.msg.success("Habitación actualizada correctamente.");
        this.closeEditRoomModal();
        this.getRooms();
      },
      (error) => {
        this.msg.error("Error al actualizar la habitación");
      }
    );
  }

  getRooms(): void {
    
    this.roomService.ListRooms().then((value) => {
      this.rooms = value;
      this.displayRooms = this.rooms.filter(x => x.type_id === this.activeRoomType);
    });
  }
}
