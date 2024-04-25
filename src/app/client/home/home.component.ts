import { Component, OnInit } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  pageData : Page = new Page();

  constructor(pageService : PageService){

    pageService.loadPage("home").then((value) => this.pageData = value);
  }

}
