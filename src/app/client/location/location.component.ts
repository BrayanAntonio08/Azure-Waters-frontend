import { Component } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  pageData: Page = new Page();

  constructor(pageService: PageService, private toastr: ToastrService){
    pageService.loadPage("location").then(
      (value) => {
        this.pageData = value;
      }
    );
  }
}
