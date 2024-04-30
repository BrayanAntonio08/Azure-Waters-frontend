import { Component } from '@angular/core';
import { Room } from '../../core/models/Room';
import { RoomType } from '../../core/models/RoomType';
import { RoomService } from '../../core/services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-room-availability',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './room-availability.component.html',
  styleUrl: './room-availability.component.css'
})
export class RoomAvailabilityComponent {

  habitacionesDisponibles: Room[] = []; // Array to store available rooms
  fechaInicio: Date = new Date(); // Default start date
  fechaFinal: Date = new Date(this.fechaInicio.getTime() + 24 * 60 * 60 * 1000); // Default end date (1 day after start date)
  cargando: boolean = false; // Flag for loading state
  tiposHabitaciones: RoomType[] = []; // Array to store room types
  tipoHabitacionSeleccionado: RoomType | null = null; // Selected room type (optional)
  tipoHabitacionSeleccionado2 = new RoomType();
  costoEstancia: number = 0; // Static cost of stay

  constructor(private servicioHabitacion: RoomService) {} // Inject RoomService

  ngOnInit(): void {
    this.obtenerHabitacionesDisponibles();
    this.obtenerTiposHabitacion(); // Fetch room types on component initialization
  }



  obtenerHabitacionesDisponibles(): void {
    this.cargando = true; // Establecer bandera de carga en verdadero
    this.servicioHabitacion.getRoom() // Utilizar el método getRoom de RoomService
      .subscribe(todasLasHabitaciones => {
        // Filtrar habitaciones según los criterios de disponibilidad (asumiendo propiedades 'active' y 'reserved')
        this.habitacionesDisponibles = todasLasHabitaciones.filter(habitacion => habitacion.active && !habitacion.reserved);
  
        // Aplicar filtro de tipo de habitación solo si se selecciona un tipo
        if (this.tipoHabitacionSeleccionado) {
          this.habitacionesDisponibles = this.habitacionesDisponibles.filter(habitacion => habitacion.type_id === this.tipoHabitacionSeleccionado2.id);

        }
  
        this.cargando = false; // Establecer bandera de carga en falso después del filtrado
      });
  }

  obtenerTiposHabitacion(): void {
    this.servicioHabitacion.ListRoomTypes() 
      .then(tipos => {
        this.tiposHabitaciones = tipos;
      });
  }

  consultarDisponibilidad(): void {
    this.obtenerHabitacionesDisponibles(); 
  }

  seleccionarTipoHabitacion(tipo: RoomType): void {
    this.tipoHabitacionSeleccionado = tipo;
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