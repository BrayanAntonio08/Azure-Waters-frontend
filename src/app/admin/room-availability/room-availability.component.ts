import { Component, OnInit} from '@angular/core';
import { RoomDto } from '../../core/models/Room';
import { RoomService } from '../../core/services/room.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room-availability',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css']
})
export class RoomAvailabilityComponent implements OnInit  {

  consultaForm: FormGroup = this.fb.group({
    fechaInicio: [''],
    fechaFin: [''],
    idTipoHabitacion: ['']
  });
  habitaciones: RoomDto[] = [];

  constructor(
    private fb: FormBuilder,
    private habitacionService: RoomService
  ) {}

  ngOnInit(): void {}

  consultar(): void {
    const { fechaInicio, fechaFin, idTipoHabitacion } = this.consultaForm.value;

    this.habitacionService.consultarDisponibilidad(fechaInicio, fechaFin, idTipoHabitacion)
      .subscribe(habitaciones => {
        this.habitaciones = habitaciones;
      });
  }
}