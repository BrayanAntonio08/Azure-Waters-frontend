import { Component, OnInit } from '@angular/core';
import { PageService } from '../../core/services/page.service';
import { Page } from '../../core/models/Page';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{

  images: string[] = [];
  activeImage : string = "";
  pageData : Page = new Page();

  constructor(pageService : PageService){

    pageService.loadPage("about").then((value) => this.pageData = value);
  }

  ngOnInit(): void {
    //Cargar las imagenes
    this.images = [
      "https://images.hola.com/imagenes/decoracion/20230425230358/dormitorios-inspirados-en-habitaciones-hoteles-am/1-237-28/habitaciones-hotel-5a-a.jpg",
      "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2021/11/03/20193ba71b7249a697bdfcca3779e61f_hero_image_spain.jpg",
      "https://cadenaser.com/resizer/nxbawbAS0xUJhkfbywRwyhui_Kc=/650x488/filters:quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/H73WX3XTQJIR7AAM2ZK6FMXAHQ.jpg",
      "https://cdn.observador.cr/wp-content/uploads/2022/09/Casa-Turire-2.jpeg",
      "https://revistasumma.com/wp-content/uploads/2021/01/hotel-.jpg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_600,q_auto,w_600//hotelier-images/f5/c4/34b561f5b55be3d66ab43d2a0b012c735ec2d17b7ea039b67235afc707c6.jpeg",
      "https://apetitoenlinea.com/wp-content/uploads/2020/11/Balmoral-2020-015-scaled-e1606228532946.jpg",
      "https://conocedores.com/wp-content/uploads/2022/05/hoteles-all-inclusive-costa-rica-the-reatreat-spa-piscina-16052022.webp",
      "https://www.eroomsuite.com/wp-content/uploads/2024/01/que-servicios-ofrece-un-hotel.webp",
      "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg",
      "https://assets.tivolihotels.com/image/upload/q_auto,f_auto%2Cc_limit%2Cw_1378/media/minor/tivoli/images/brand_level/footer/1920x1000/thr_aboutus1_1920x1000.jpg",
    ];
    //activar la primer imagen
    this.activeImage = this.images[0];
  }

  clickImage(img:string){
    this.activeImage = img;
  }
}
