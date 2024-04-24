import { Component } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  pageData: Page = new Page();
  constructor(pageService: PageService){
    pageService.loadPage("location").then(value => this.pageData = value);
  }
}
