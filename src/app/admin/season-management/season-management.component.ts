import { Component, OnInit } from '@angular/core';
import { Temporada } from '../../core/models/season';
import { SeasonService } from '../../core/services/season.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-season-management',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './season-management.component.html',
  styleUrls: ['./season-management.component.css']
})
export class SeasonManagementComponent implements OnInit {
  temporadas: Temporada[] = [];
  nuevaTemporada: Temporada = { idTemporada: 0, fechaInicio: null, fechaFin: null, descuento: null, idTipo: 0 };
  tiposHabitacion = [
    { id: 1, nombre: 'Habitación Estándar' },
    { id: 2, nombre: 'Habitación Familiar' },
    { id: 3, nombre: 'Habitación de Lujo' }
  ];

  constructor(private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.getTemporada();
  }

  getTemporada(): void {
    this.seasonService.getTemporada().subscribe(
      (temporadas: Temporada[]) => {
        this.temporadas = temporadas;
      },
      (error) => {
        console.error('Error al obtener las temporadas:', error);
      }
    );
  }

  eliminarTemporada(id: number): void {
    this.seasonService.deleteTemporada(id).subscribe(
      () => {
        this.getTemporada();
      },
      (error) => {
        console.error('Error al eliminar la temporada:', error);
      }
    );
  }

  openAddSeasonModal(): void {
    const modal = document.getElementById('addSeasonModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openUpdateSeasonModal(temporada: Temporada): void {
    this.nuevaTemporada = { ...temporada };
    const modal = document.getElementById('addSeasonModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeAddSeasonModal(): void {
    const modal = document.getElementById('addSeasonModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  agregarActualizarTemporada(): void {
    if (this.nuevaTemporada.idTemporada === 0) {
      this.seasonService.addTemporada(this.nuevaTemporada).subscribe(
        () => {
          this.closeAddSeasonModal();
          this.getTemporada();
          this.nuevaTemporada = { idTemporada: 0, fechaInicio: null, fechaFin: null, descuento: null, idTipo: 0 };
        },
        (error) => {
          console.error('Error al agregar la temporada:', error);
        }
      );
    } else {
      this.seasonService.updateTemporada(this.nuevaTemporada).subscribe(
        () => {
          this.closeAddSeasonModal();
          this.getTemporada();
          this.nuevaTemporada = { idTemporada: 0, fechaInicio: null, fechaFin: null, descuento: null, idTipo: 0 };
        },
        (error) => {
          console.error('Error al actualizar la temporada:', error);
        }
      );
    }
  }
}
