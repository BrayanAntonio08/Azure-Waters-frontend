import { Component, OnInit } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';
import { Image } from '../../core/models/Image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  pageData : Page = new Page();
  image: Image = new Image();

  constructor(pageService : PageService){

    pageService.loadPage("home").then((value) => this.pageData = value);
    pageService.loadImages("home").then(value =>{
      if(value.length > 0){
        this.image = value[0];
      }
    });
  }

}
