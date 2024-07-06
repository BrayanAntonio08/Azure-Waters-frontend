import { Component } from '@angular/core';
import { ClientNavbarComponent } from '../client-navbar/client-navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdvertisementComponent } from '../advertisement/advertisement.component';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [ClientNavbarComponent, AdvertisementComponent, RouterOutlet, RouterLink],
  template: `
    <header class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
        <img
          src="assets/img/logo.png"
        />
        <h3 class="text-white">Hotel Azure Waters</h3>
      </div>
      <div class="d-flex align-items-center">
        <a routerLink="/auth" class="btn btn-outline-light">Ingresar</a>
      </div>
      
    </header>
    <main class="container-fluid d-flex">
      <div class="d-flex flex-column d-none d-sm-flex col-sm-3 col-md-2">
        <app-client-navbar />
        <div style="margin-top: 150px;">
          <!--espacio vertical-->
          <app-advertisement />
        </div>
      </div>
      <div class="col">
        <router-outlet />
      </div>
    </main>
  `,
  styles: `
    header{
    width: 100%;
    background-color: rgb(70,110,110);
    padding: 30px;
    margin-bottom: 20px;
    display: flex;
    }

    img{
      width: 45px;
      height: 45px;
      margin-right:30px;
    }

    .text-white {
      text-decoration: none;
      color: #0056b3; 
      font-weight: bold;
      font-size: 2.5rem;
    }
  `,
})
export class ClientLayoutComponent {}
