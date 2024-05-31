import { Component } from '@angular/core';
import { Advertisement } from '../../core/models/Advertisment';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Image } from '../../core/models/Image';
import { ImageService } from '../../core/services/image.service';

@Component({
  selector: 'app-advertisment-manager',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './advertisment-manager.component.html',
  styleUrl: './advertisment-manager.component.css'
})
export class AdvertismentManagerComponent {

  advertisements : Advertisement[] = [];
  advertisement: Advertisement = new Advertisement();
  adImgFile : File|undefined;
  linkURL: string = '';

  faPen = faPen;
  faTrash = faTrash;

  constructor(
    private adService: AdvertisementService,
    private msg:ToastrService,
    private imageService: ImageService
  ){
    this.loadAdds();
  }

  async loadAdds(){
    this.advertisements = await this.adService.listAdds();
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    let image = new Image();
    image.url = URL.createObjectURL(file);
    this.adImgFile = file;
    this.advertisement.image = image;
  }

  delete(advertisement: Advertisement){
    this.adService.deleteAd(advertisement).then(deleted =>{
      if(deleted){
        this.msg.success("Eliminado correctamente");
        this.loadAdds();
      }else{
        this.msg.error("Fallo en la operación")
      }
    })
  }

  edit(advertisement: Advertisement){
    this.advertisement = advertisement;
  }
  cancel(){
    this.advertisement = new Advertisement();
    this.adImgFile = undefined;
  }

  async save(){
    //upload image if not saved
    if(this.advertisement.image.id === 0 && this.adImgFile != undefined){
      this.advertisement.image  = await this.imageService.upload(this.adImgFile);
      console.log(this.advertisement)
    }
    if(this.advertisement.id == 0){
      // create
      this.adService.createAd(this.advertisement).then(x => {
        this.msg.success("Anuncio insertado con éxito");
        this.loadAdds();
      });
    }else{
      // update
      this.adService.updateAd(this.advertisement).then(x => {
        this.msg.success("Anuncio actualizado con éxito");
        this.loadAdds();
      })
    }
  }
}
