import { Component, OnInit } from '@angular/core';
import { Facilidad } from '../../core/models/Facilities';
import { FacilitiesService } from '../../core/services/facilities.service';
@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})

export class FacilitiesComponent implements OnInit {
  facilitiesData: Facilidad = new Facilidad();

  constructor(private facilitiesService: FacilitiesService) { }

  ngOnInit() {
    this.loadFacilities();
  }

  loadFacilities() {
    this.facilitiesService.loadFacilities('facilities')
      .then((data) => {
        this.facilitiesData = data;
      })
      .catch((error) => {
        console.error('Error al cargar las facilidades:', error);
      });
  }
}
