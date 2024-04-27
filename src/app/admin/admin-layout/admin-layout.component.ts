import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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
        <p>Bienvenido {{user}}<p>
        <button class="btn btn-outline-danger ms-4" (click)="logout()">Salir</button>
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

  user: string = "";
  constructor(private loginService: AuthService, private router: Router) { 
    let value = sessionStorage.getItem("usuario");
    this.user = value? value: "";
  }

  logout() {
    if (this.loginService.isAdminActive()) {
      this.loginService.logout();
      this.loginService.active = false;
      console.log("Se cerró la sesión correctamente: " + this.loginService.active);
      this.router.navigate(['/auth']);
    } else {
      console.log("No ha iniciado sesión.");
    }
  }

}
