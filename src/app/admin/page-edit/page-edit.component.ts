import { Component } from '@angular/core';
import { Image } from '../../core/models/Image';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '../editor/editor.component';
import { ImageService } from '../../core/services/image.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { FacilitiesService } from '../../core/services/facilities.service';
import { Facilidad } from '../../core/models/Facilities';

@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [FormsModule, EditorComponent, FontAwesomeModule],
  templateUrl: './page-edit.component.html',
  styleUrl: './page-edit.component.css'
})
export class PageEditComponent {
  editing = false;
  editingPage: string= "";
  pages : any = {
    'home': 'Home',
    'about': 'Sobre nosotros',
    'location': 'Cómo llegar',
    'contact': 'Contacto',
    'facilities': 'Facilidades'
  }
 
  imgFiles: fileData[] = [];
  pageImg: Image[] = [];
  pageInfo: Page = new Page();
  facilities: Facilidad[] = []
  facilityInfo: Facilidad | undefined | null = null;

  faX = faX
  faUpload = faCloudArrowUp
  faPen = faPen


  constructor(
    private pageService: PageService, 
    private imgService: ImageService, 
    private facilitiesService: FacilitiesService){
  }

  editPage(page: string){
    this.editingPage = page;

    // when is home or about we have to load the actual images in page
    if(['home','about'].find(p => p === page) != undefined){
      this.pageService.loadImages(this.editingPage).then((value) => {
          this.pageImg = value;
        })
    }
    
    // also we need to load the page info so the text editor contains it
    if (page != 'facilities')
      this.pageService.loadPage(this.editingPage).then((value) => {
        this.pageInfo = value;
        // now we have the information, we have to load it in the text editor but for that we use a Input value on editor component
      })
    else // get facilities
      this.facilitiesService.getFacilities().subscribe((value) =>{
        this.facilities = value;
      })
      
    this.editing = true;
  }

  deleteImage(img: Image){
    if(img.id == 0){
      // should delete the file
      let imgPos = this.pageImg.findIndex((value)=>value.url===img.url);
      this.imgFiles = this.imgFiles.filter(x => x.imagePos != imgPos);
      this.imgFiles = this.imgFiles.map(x => {
        x.imagePos = x.imagePos > imgPos? x.imagePos-1:x.imagePos;
        return x;
      })
      console.log(this.imgFiles);

      this.pageImg = this.pageImg.filter((x) => x.url != img.url);
      return
    }
    this.pageImg = this.pageImg.filter((x) => x.id != img.id);
  }

  selectFile(event: any) {
    const files = event.target.files;
    
    // load the images into the img array, or change the value if home page is editing
    if(this.editingPage == 'home'){
      const file = files[0];
      this.pageImg = [];
      this.imgFiles = [];
      let image = new Image();
      image.url = URL.createObjectURL(file);
      this.pageImg.push(image);
      this.imgFiles.push({imagePos:0, file:file})
    }
    if (this.editingPage == 'about') {
      if(files.length === 0) return;

      for (let i = 0; i < files.length; i++) {
        let image = new Image()
        image.url = URL.createObjectURL(files[i]);
        let imagePos = this.pageImg.length;
        this.pageImg.push(image);
        this.imgFiles.push({imagePos:imagePos, file:files[i]})
      }
      console.log(this.imgFiles);
    }
  }

  async saveChanges(){
    this.pageInfo.imagenes = this.pageImg;

    if(this.editingPage == 'home'){
      //check if picture is from file
      console.log(this.imgFiles);
      if(this.imgFiles.length > 0){
        //upload file to cloudinary
        let newImg = await this.imgService.upload(this.imgFiles[0].file)
        this.pageImg = [newImg]
      }
    }
    if(this.editingPage === 'about'){
      let totalImages = this.pageImg.length;
      // delete the temp images so they are replaced with those saved at cloudinary
      this.pageImg = this.pageImg.filter(x => x.id != 0);
      //save every file
      while(this.imgFiles.length > 0){
        let imgFile = this.imgFiles.shift()
        if(imgFile){
          let savedImg = await this.imgService.upload(imgFile.file);
          this.pageImg.push(savedImg);
        }
      }
    }

    this.pageInfo.imagenes = this.pageImg;
    console.log(this.pageImg)
    this.pageService.modifyPage(this.pageInfo)
  }

  cancel(){
    this.editing = false;
  }

  receivePageText(text : string){
    this.pageInfo.texto = text;
  }

  editFacility(facility: Facilidad){
    this.facilityInfo = facility;
  }
  cancelEditFacility(){
    this.facilityInfo = null;
    this.facilitiesService.getFacilities().subscribe((value) =>{
      this.facilities = value;
    })
  }
  receiveFacilityText(text : string){
    if(this.facilityInfo)
      this.facilityInfo.texto = text;
  }

 async saveFacility(){
    if(this.facilityInfo){
      this.facilityInfo = await this.facilitiesService.updateFacility(this.facilityInfo);
      
    }
  }
}

interface fileData {
    imagePos:number
    file:File
}