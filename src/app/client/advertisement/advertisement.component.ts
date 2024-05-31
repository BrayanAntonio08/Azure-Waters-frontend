import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { Advertisement } from '../../core/models/Advertisment';

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
  ads: Advertisement[] = [];
  images: Image[] = [];
  selectedIndex = 0;

  constructor(private adService: AdvertisementService){}

  ngOnInit(): void {
    this.loadAds();

    //Setear el cambio de imagen cada 5 segundos
    setInterval(()=>{
      this.selectedIndex = (this.selectedIndex+1)%this.ads.length;
    }, 5000);
  }

  loadAds() {
    this.adService.listAdds().then(value => this.ads = value);
  }
}
