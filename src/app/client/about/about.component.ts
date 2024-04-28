import { Component, OnInit } from '@angular/core';
import { PageService } from '../../core/services/page.service';
import { Page } from '../../core/models/Page';
import { Image } from '../../core/models/Image';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  images: Image[] = [];
  activeImage : Image = new Image();
  pageData : Page = new Page();

  constructor(pageService : PageService){

    pageService.loadPage("about").then((value) => this.pageData = value);
    //Cargar las imagenes
    pageService.loadImages("about").then((value) => {
      this.images = value;
      //activar la primer imagen
      this.activeImage = this.images[0];
    });
  }

  clickImage(img:Image){
    this.activeImage = img;
  }
}
