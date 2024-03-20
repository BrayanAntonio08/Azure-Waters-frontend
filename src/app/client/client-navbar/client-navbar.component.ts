import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul class="nav display-flex flex-column">
        <li class="nav-item">
          <a routerLink="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a routerLink="/about" class="nav-link">Sobre nosotros</a>
        </li>
        <li class="nav-item">
          <a routerLink="/facilities" class="nav-link">Facilidades</a>
        </li>
        <li class="nav-item">
          <a routerLink="/location" class="nav-link">¿Cómo llegar?</a>
        </li>
        <li class="nav-item">
          <a routerLink="/rates" class="nav-link">Tarifas</a>
        </li>
        <li class="nav-item">
          <a routerLink="/book" class="nav-link">Reservar en línea</a>
        </li>
        <li class="nav-item">
          <a routerLink="/contact" class="nav-link">Contáctenos</a>
        </li>
      </ul>
    </nav>
  `,
  styles: ``,
})
export class ClientNavbarComponent {}
