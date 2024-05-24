import { Component } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Image } from '../../core/models/Image';
import { Page } from '../../core/models/Page';
import { PageService } from '../../core/services/page.service';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '../editor/editor.component';
import { ImageService } from '../../core/services/image.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [EditorModule, FormsModule, EditorComponent, FontAwesomeModule],
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
    'contact': 'Contacto'
  }
  imgFiles: File[] = [];
  pageImg: Image[] = [];
  pageInfo: Page = new Page();
  faX = faX

  editorConfig = {
    plugins: [
      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media',
      'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist', 'mediaembed', 'casechange', 'export',
      'formatpainter', 'pageembed', 'linkchecker', 'permanentpen', 'powerpaste',
      'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents',
      'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | align lineheight | checklist numlist bullist indent outdent | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    language: 'es', // Set language to Spanish
    language_url: 'URL_TO_SPANISH_LANG_FILE',
    ai_request: (request:any, respondWith:any) => respondWith.string(() => Promise.reject(" See docs to implement AIAssistant")), 
  }

  constructor(private pageService: PageService, private imgService: ImageService){
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
    this.pageService.loadPage(this.editingPage).then((value) => {
        this.pageInfo = value;
        // now we have the information, we have to load it in the text editor but for that we use a Input value on editor component

      })
  
    this.editing = true;
  }

  selectFile(event: any) {
    this.imgFiles = event.target.files;
    console.log(this.imgFiles);
    // load the images into the img array, or change the value if home page is editing
    if(this.editingPage == 'home'){
      const file = this.imgFiles[0];
      this.pageImg = []
      let image = new Image()
      image.url = URL.createObjectURL(file);
      this.pageImg.push(image);
    }
  }

  async saveChanges(){
    this.pageInfo.imagenes = this.pageImg;

    if(this.editingPage == 'home'){
      //check if picture is from file
      console.log(this.imgFiles);
      if(this.imgFiles.length > 0){
        //upload file to cloudinary
        let newImg = await this.imgService.upload(this.imgFiles[0])
        this.pageImg = [newImg]
      }
    }

    this.pageInfo.imagenes = this.pageImg;
    this.pageService.modifyPage(this.pageInfo)
  }

  cancel(){
    this.editing = false;
  }

  receivePageText(text : string){
    this.pageInfo.texto = text;
  }
}
