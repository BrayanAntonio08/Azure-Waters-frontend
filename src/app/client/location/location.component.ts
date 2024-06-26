import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
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
export class LocationComponent implements OnInit {
  pageData: Page = new Page();
  map: google.maps.Map | undefined;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;

  destination = { lat: 10.677463309307484, lng: -85.51091879129466 };

  constructor(private pageService: PageService, private toastr: ToastrService) {
    pageService.loadPage("location").then(
      (value) => {
        this.pageData = value;
      }
    );
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.initMap(userLocation);
        },
        (error) => {
          console.error('Geolocation error: ', error);
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  initMap(userLocation: { lat: number; lng: number }): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBGQZhRw7KMTkvsLjb1PceUnV4JtaxM3sA',
      version: 'weekly',
      libraries: ['places'], 
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: userLocation,
        zoom: 14,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.directionsRenderer.setMap(this.map);

      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer?.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });

      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: 'Your Location'
      });
    }).catch(error => {
      console.error('Error loading Google Maps: ', error);
    });
  }
}
