import { Component } from '@angular/core';
import { ClientNavbarComponent } from '../client-navbar/client-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [ClientNavbarComponent, RouterOutlet],
  template: `
    <header>
      <img
        src="https://img.freepik.com/vector-premium/ilustracion-simple-logotipo-hotel_434503-736.jpg?w=2000"
      />
      <h3 class="text-white">Hotel Azure Waters</h3>
    </header>
    <main class="container-fluid d-flex">
      <app-client-navbar />
      <router-outlet />
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
      width: 40px;
      height: 40px;
      margin-right:50px;
    }
  }
  `,
})
export class ClientLayoutComponent {}
