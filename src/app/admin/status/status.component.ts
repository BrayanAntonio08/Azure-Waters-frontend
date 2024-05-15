import { Component } from '@angular/core';
import { Room } from '../../core/models/Room';
import { RoomService } from '../../core/services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RoomType } from '../../core/models/RoomType';


@Component({
  selector: 'app-status',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {

  habitacionesPorPagina: number = 23;
  paginaActual: number = 1;
  fechaActual: Date = new Date();

  fechaActualizada = `
    ${String(this.fechaActual.getDate()).padStart(2, '0')}/
    ${String(this.fechaActual.getMonth() + 1).padStart(2, '0')}/
    ${this.fechaActual.getFullYear().toString()}
  `;

  rooms: Room[] = [];
  pdfPreviewUrl: string | null = null;

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

  //NEW
  printRoomStatus2(): void {
    const doc = new jsPDF();
    let y = 10;
    this.rooms.forEach((room, index) => {
      if (index % this.habitacionesPorPagina === 0 && index !== 0) {
        doc.addPage();
        y = 10;
      }
      doc.text(`Habitación ${room.id}: ${this.getRoomType(room)} - ${this.getRoomStatus(room)}`, 10, y);
      y += 10;
    });
    doc.save('estado_habitaciones.pdf');
  }

  printRoomStatus(): void {
    const doc = new jsPDF();
    let y = 10;
  
    // Agregar título
    doc.setFontSize(16);
    doc.text('Azure Waters', 10, y);
    y += 10;
  
    // Agregar subtítulo
    doc.setFontSize(12);
    doc.text('Estado de las habitaciones del Hotel el día de hoy', 10, y);
    y += 10;
  
    // Agregar fecha actual
    doc.setFontSize(10);
    doc.text(`Fecha: ${this.fechaActual.toLocaleDateString()}`, 10, y);
    y += 10;

    // Agregar línea divisoria
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y); // Línea horizontal
    y += 5; // Ajuste de espacio después de la línea divisoria

  
    // Agregar estado de las habitaciones
    this.rooms.forEach((room, index) => {
      if (index % this.habitacionesPorPagina === 0 && index !== 0) {
        doc.addPage();
        y = 10;
      }
      doc.text(`Habitación ${room.id}                                ${this.getRoomType(room)}                                ${this.getRoomStatus(room)}`, 10, y);
      y += 10;
    });
    doc.save('estado_habitaciones.pdf');
  }

  
}