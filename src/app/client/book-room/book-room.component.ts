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

  // variables de datos
  estado: string = "";
  room = {
    img: "https://www.culmia.com/blog/wp-content/uploads/2021/07/Como-distribuir-los-muebles-en-una-habitacion.jpg",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos in magni velit cum tempora amet soluta tempore nostrum excepturi accusantium iure laudantium corrupti dolorum beatae ipsam, repellendus iusto fugiat rerum?"
  }
  cliente: Client = new Client();

  // variables de entrada para la transacción
  arriving?: Date;
  departing?: Date;
  codigoReserva = "";
  

  buscarHabitacion() {
    console.log(this.arriving);
    console.log(this.departing);

    let found = Math.random() < 0.5; // implementación provisional de si hay disponibilidad o no
    if (found)
      this.estado = "booking";
    else 
      this.estado = "failed";
  }

  crearReservacion() {
    this.codigoReserva = this.newGuid();
    this.estado = "success";
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
