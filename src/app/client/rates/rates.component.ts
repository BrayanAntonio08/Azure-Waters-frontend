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
    { name: 'Habitación estándar', lowSeasonPrice: 140, highSeasonPrice: 180 , imageUrl: 'https://th.bing.com/th/id/R.74e5231e13476fc61e51ce34492491bf?rik=bSnynNm6B21n9A&riu=http%3a%2f%2fwww.magnosuites.com%2fwp-content%2fuploads%2f2016%2f06%2fhabitacion-estandar-magno-suites-1.jpg&ehk=fPW1%2bA5r74otLF%2f01a2iK0k4acPYyRhLP9vqAOLSnfg%3d&risl=&pid=ImgRaw&r=0'},
    { name: 'Habitación familiar', lowSeasonPrice: 250, highSeasonPrice: 300 , imageUrl: 'https://hotelsuamox.com/wp-content/uploads/2020/04/5.HABITACI%C3%93N-FAMILIAR-con-ba%C3%B1o-privado-scaled.jpg'},
    { name: 'Habitación de lujo', lowSeasonPrice: 380, highSeasonPrice: 420 , imageUrl: 'https://i.pinimg.com/originals/74/6d/92/746d92ea9f29f8a43eab60e57bc8ebda.jpg'}
  ];
}


