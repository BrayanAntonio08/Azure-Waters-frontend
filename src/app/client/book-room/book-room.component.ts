import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../core/models/Client';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css'
})
export class BookRoomComponent {

  estado: string = "";
  arriving? :Date;
  departing? : Date;
  codigoReserva = "";
  cliente: Client = new Client();

  buscarHabitacion(){
    console.log(this.arriving);
    console.log(this.departing);
    this.estado = "booking";
  }

  crearReservacion(){
    this.codigoReserva = this.newGuid();
    this.estado = "success";
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
