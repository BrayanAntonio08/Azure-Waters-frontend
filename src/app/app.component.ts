import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoHotel';
}
 




