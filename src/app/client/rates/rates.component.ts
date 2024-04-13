/*import { Component } from '@angular/core';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css'
})
export class RatesComponent {

}*/


import { Component } from '@angular/core';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})

export class RatesComponent {
  roomTypes = [
    { name: 'Single', lowSeasonPrice: 100, highSeasonPrice: 150, imageUrl: 'assets/bedroom.jpg' },
    { name: 'Double', lowSeasonPrice: 150, highSeasonPrice: 200 },
  ];
}


