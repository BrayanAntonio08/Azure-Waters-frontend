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
        <li class="nav-item">
          <a routerLink="offers" class="nav-link">Ofertas</a>
        </li>
        <li class="nav-item">
          <a routerLink="seasons" class="nav-link">Temporadas</a>
        </li>
      </ul>
    </nav>
  `,
  styles: `
  .navbar {
      background-color: #f8f9fa;
      padding: 1rem;
    }
    .nav {
      list-style-type: none;
      padding: 0;
    }
    .nav-item {
      margin: 0.5rem 0;
    }
    .nav-link {
      font-size: 20px;
      text-decoration: none;
      color: #000000; 
      font-weight: bold;
    }
    .nav-link:hover {
      color: #0056b3;
    }
    `
})
export class AdminNavbarComponent {

}
