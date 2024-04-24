import { Component } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  pageData : Page = new Page();

  constructor(pageService : PageService){

    pageService.loadPage("contact").then((value) => this.pageData = value);
  }
}
