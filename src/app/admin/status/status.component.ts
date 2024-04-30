import { Component } from '@angular/core';
import { Room } from '../../core/models/Room';
import { RoomService } from '../../core/services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {

  habitacionesPorPagina: number = 6;
  paginaActual: number = 1;
  fechaActual: Date = new Date();

  fechaActualizada = `
    ${String(this.fechaActual.getDate()).padStart(2, '0')}/
    ${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}/
    ${this.fechaActual.getFullYear().toString()}
  `;

  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    this.roomService.getRoom().subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
      },
      (error) => {
        console.error('Error al obtener las habitaciones:', error);
      }
    );
  }

  getRoomStatus(rooms: Room): string {
    if (rooms.reserved) {
      return 'OCUPADA';
    } else {
      return 'DISPONIBLE';
    }
  }

  getRoomType(room: Room): string {
    switch (room.type_id) {
      case 1:
        return 'Estándar';
      case 2:
        return 'Familiar';
      case 3:
        return 'De lujo';
      default:
        return 'Tipo desconocido';
    }
  }

}
