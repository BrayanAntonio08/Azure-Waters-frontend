import { Component, OnInit } from '@angular/core';
import { Temporada } from '../../core/models/season';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-season-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './season-management.component.html',
  styleUrl: './season-management.component.css'
})
export class SeasonManagementComponent implements OnInit {
  temporadas: Temporada[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getTemporada();
  }

  getTemporada(): void {
    this.authService.getTemporada().subscribe(
      (temporadas: Temporada[]) => {
        this.temporadas = temporadas;
      },
      (error) => {
        console.error('Error al obtener las temporadas:', error);
      }
    );
  }
}
