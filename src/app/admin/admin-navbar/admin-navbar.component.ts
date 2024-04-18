import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul class="nav display-flex flex-column">
        <li class="nav-item">
          <a routerLink="/admin" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a routerLink="page-edit" class="nav-link">Modificar páginas</a>
        </li>
        <li class="nav-item">
          <a routerLink="reservations" class="nav-link">Listado de reservaciones</a>
        </li>
        <li class="nav-item">
          <a routerLink="rooms" class="nav-link">Administrar habitaciones</a>
        </li>
        <li class="nav-item">
          <a routerLink="status" class="nav-link">Ver estado del hotel hoy</a>
        </li>
        <li class="nav-item">
          <a routerLink="availability" class="nav-link">Disponibilidad de habitaciones</a>
        </li>
        <li class="nav-item">
          <a routerLink="ads" class="nav-link">Publicidad</a>
        </li>
      </ul>
    </nav>
  `,
  styles: ``
})
export class AdminNavbarComponent {

}
