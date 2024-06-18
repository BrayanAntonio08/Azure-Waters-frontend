import { Component } from '@angular/core';
import { Offer } from '../../core/models/Offer';
import { OfferService } from '../../core/services/offer.service';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RoomType } from '../../core/models/RoomType';
import { RoomService } from '../../core/services/room.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-management',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ToastrModule],
  templateUrl: './offer-management.component.html',
  styleUrl: './offer-management.component.css'
})
export class OfferManagementComponent {

  iconEdit = faPen;
  iconDelete = faTrash;

  roomTypes: RoomType[] = [];
  offers: Offer[] = [];
  offer: Offer = new Offer();
  formVisible = false;


  constructor(private offeService: OfferService, private roomTypeService: RoomService, private msg: ToastrService){
    this.offeService.list().then((value)=> this.offers = value)
    this.roomTypeService.ListRoomTypes().then(value => this.roomTypes = value)
  }

  delete(id:number){
    this.offeService.delete(id).then(deleted => {
      if(deleted){
        this.msg.success("Elemento eliminado");
        this.offers = this.offers.filter(value => value.id !== id);
      }else{
        this.msg.error("Posiblemente ya no se encuentra almacenado","No se ha eliminado el elemento")
      }
    }).catch(error => this.msg.error("Posiblemente ya no se encuentra almacenado","No se ha eliminado el elemento"));
  }
  edit(offer: Offer){
    this.offer = {...offer};
    this.formVisible = true;
  }

  create(){
    this.offer = new Offer();
    this.formVisible = true;
  }

  cancelChages(){
    this.formVisible = false;
  }

  saveChanges(){
    if(this.offer.id === 0){
      // create a new one
      this.offeService.create(this.offer).then(value => {
        this.offers.push(value);
        this.msg.success("Oferta creada exitosamente");
        this.formVisible = false;
      })
    }else{
      //update
      this.offeService.update(this.offer).then(value => {
        this.msg.success("Oferta modificada exitosamente");
        this.offers = this.offers.map(item => item.id === value.id? value: item);
        this.formVisible = false;
      })
    }
  }
}
