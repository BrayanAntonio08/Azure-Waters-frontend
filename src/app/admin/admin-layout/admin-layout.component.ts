import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent],
  template: `
    <header class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
      <img
        src="assets/img/logo.png"
      />
      <h3 class="text-white">Hotel Azure Waters</h3>
      <h5 class="text-white ms-3">Módulo administrativo</h5>
      </div>
      <div class="d-flex align-items-center">
        <p>Bienvenido [usuario]<p>
        <button class="btn btn-outline-danger ms-4">Salir</button>
      </div>
    </header>
    <main class="container-fluid d-flex">
      <div class="d-flex flex-column d-none d-sm-flex col-sm-3 col-md-2">
        <app-admin-navbar></app-admin-navbar>
      </div>
      <div class="col">
        <router-outlet />
      </div>
    </main>
  `,
  styles: `
  header{
    width: 100%;
    background-color: rgb(50,160,250);
    padding: 20px;
    margin-bottom: 20px;
    display: flex;

    img{
      width: 45px;
      height: 45px;
      margin-right:30px;
    }
  }
  `
})
export class AdminLayoutComponent {

}
