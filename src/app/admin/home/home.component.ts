import { Component,ViewChild , ElementRef } from '@angular/core';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';
import { Image } from '../../core/models/Image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  pageData: Page = new Page();
  image: Image = new Image();
  searchTerm: string = '';

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.loadPageData();
    this.loadImages();
  }

  private loadPageData(): void {
    this.pageService.loadPage('homeAdm').then((value) => this.pageData = value);
  }

  private loadImages(): void {
    this.pageService.loadImages('homeAdm').then((value) => {
      if (value.length > 0) {
        this.image = value[0];
      }
    });
  }
}