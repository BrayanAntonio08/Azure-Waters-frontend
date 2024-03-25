import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Image {
  imgSrc: string;
  imgAlt: string;
  link: string;
}

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css',
})
export class AdvertisementComponent implements OnInit {
  images: Image[] = [];
  selectedIndex = 0;

  ngOnInit(): void {
    this.loadImages();

    //Setear el cambio de imagen cada 5 segundos
    setInterval(()=>{
      this.selectedIndex = (this.selectedIndex+1)%this.images.length;
    }, 5000);
  }

  loadImages() {
    this.images = [
      {
        imgAlt: 'Imperial',
        imgSrc: 'assets/img/cerveza.webp',
        link: 'https://imperial.cr/promo/',
      },
      {
        imgAlt: 'Piscina',
        imgSrc: 'assets/img/piscina.jpeg',
        link: 'https://www.termaleslaureles.com',
      },
      {
        imgAlt: 'Azure',
        imgSrc: 'assets/img/azure.png',
        link: 'https://azure.microsoft.com',
      },
    ];
  }
}
