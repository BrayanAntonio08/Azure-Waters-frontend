import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../core/models/Reservation';
import { ReservationService } from '../../core/services/reservation.service';



@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  reservations: Reservation[] = [];
  currentPage: number = 1;
  pageSize: number = 20;

  processingRequest: boolean = false;
  selectedReservation: Reservation | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations(this.currentPage, this.pageSize).subscribe(
      reservations => {
        this.reservations = reservations;
      },
      error => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadReservations();
  }

  getRoomType(reservation: Reservation): string {
    switch (reservation.room_type_id) {
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


  viewDetails(reservation: Reservation): void {
    this.processingRequest = true;
    setTimeout(() => {
      this.processingRequest = false;
      this.selectedReservation = reservation;
    }, 2000);
  }

  backToList(): void {
    this.selectedReservation = null;
  }
}
