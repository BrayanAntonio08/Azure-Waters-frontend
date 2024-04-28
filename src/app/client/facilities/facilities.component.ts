import { Component, OnInit } from '@angular/core';
import { Facilidad } from '../../core/models/Facilities';
import { FacilitiesService } from '../../core/services/facilities.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})

export class FacilitiesComponent implements OnInit {
  facilidades: Facilidad[] = [];

  constructor(private facilitiesService: FacilitiesService) { }

  ngOnInit() {
    this.loadFacilities();
  }

  loadFacilities() {
    this.facilitiesService.getFacilities().subscribe(
      (data) => {
        this.facilidades = data;
      },
      (error) => {
        console.error('Error al cargar las facilidades:', error);
      }
    );
  }
}