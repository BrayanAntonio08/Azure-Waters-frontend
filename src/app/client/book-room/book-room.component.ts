import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../core/models/Client';
import { Reservation } from '../../core/models/Reservation';
import { RoomService } from '../../core/services/room.service';
import { RoomType } from '../../core/models/RoomType';
import { ReservationRoom, Room } from '../../core/models/Room';
import { ReservationService } from '../../core/services/reservation.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css'
})
export class BookRoomComponent {

  // variables de datos
  roomTypes: RoomType[] = []
  estado: string = "";
  cliente: Client = new Client();

  // variables de entrada para la transacción
  reservation : Reservation = new Reservation();
  room: ReservationRoom = new ReservationRoom();
  availableRooms: any[] = [];
  codigoReserva = "";
  
  constructor(private roomService: RoomService, private reservationService: ReservationService, private msg: ToastrService){  
    roomService.ListRoomTypes().then(value => {
      this.roomTypes = value;
      this.reservation.room_type_id = this.roomTypes[0].id;
    });
  }

  buscarHabitacion() {
    if(!this.reservation.arriving || !this.reservation.departing){
      this.msg.warning('Debe definir las fechas de la reserva')
      return;
    }

    if(this.reservation.arriving >= this.reservation.departing){
      this.msg.warning('La fecha de salida no puede ser anterior a la fecha de llegada')
      return;
    }

    this.roomService.checkRoom(this.reservation).then(
      (response) => {
        if(response.success){
          this.reservation = response.data;
          this.room = this.reservation.room? this.reservation.room: new ReservationRoom();
          this.estado = "booking";
        }else{

          this.estado = "failed";
          this.listarHabitacionesDisponibles();
        }
      }
    )
  }

  listarHabitacionesDisponibles() {
    this.roomService.getRoom().subscribe(
      (rooms: Room[]) => {
        this.availableRooms = rooms.filter(room => !room.checking && (room.type_id === 2 || room.type_id === 3));
      },
      (error) => {
        console.error('Error al listar habitaciones disponibles', error);
      }
    );
  }

  cancelBooking(){
    this.roomService.finishRevision(this.room.id);
    this.reservation = new Reservation();
    this.estado = '';
  }

  validarCampos():boolean{
    if(
      this.cliente.id === ''
      || this.cliente.name === ''
      || this.cliente.lastName === ''
      || this.cliente.email === ''
      || this.cliente.creditCard === ''
    ){
      this.msg.warning('Es necesario que complete todos los datos');
      return false;
    }

    const numericPattern = /^\d+$/;
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const creditCardPattern = /^(\d{4} \d{4} \d{4} \d{4})$/;

    let format = true;
    if(!numericPattern.test(this.cliente.id)){
      this.msg.warning('Formato de identificación incorrecto');
      format = false;
    }
    if(!namePattern.test(this.cliente.name) || !namePattern.test(this.cliente.lastName)){
      this.msg.warning('Formato de nombre o apellidos incorrecto');
      format = false;
    }
    if(!emailPattern.test(this.cliente.email)){
      this.msg.warning('Formato de correo incorrecto');
      format = false;
    }
    if(!creditCardPattern.test(this.cliente.creditCard)){
      this.msg.warning('Formato de tarjeta incorrecto');
      format = false;
    }
    return format;
  }
  crearReservacion() {
    if(!this.validarCampos())
      return
    // tranfer variables to reservation object
    this.reservation.client_id = this.cliente.id;
    this.reservation.client_lastname = this.cliente.lastName;
    this.reservation.client_name = this.cliente.name;
    this.reservation.client_email = this.cliente.email;
    this.reservation.payment_card = this.cliente.creditCard;

    console.log(this.reservation)
    this.reservationService.create(this.reservation).then(value => {
      this.reservation = value;
      this.estado = "success";
    })

  }

}
