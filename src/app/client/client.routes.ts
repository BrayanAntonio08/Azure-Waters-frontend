import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { AboutComponent } from './about/about.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { LocationComponent } from './location/location.component';
import { RatesComponent } from './rates/rates.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { ContactComponent } from './contact/contact.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path:'about', component:AboutComponent},
      {path:'facilities', component:FacilitiesComponent},
      {path:'location', component:LocationComponent},
      {path:'rates', component:RatesComponent},
      {path:'book', component:BookRoomComponent},
      {path:'contact', component:ContactComponent},
    ]
  },
];
