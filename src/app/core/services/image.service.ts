import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/Image';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url:string = "https://api.cloudinary.com/v1_1/if7100/upload";
  constructor(private http: HttpClient, private msg: ToastrService) { }

  upload(file: File): Promise<Image>{
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'preset_if7100');
    data.append('cloud_name', 'dgfmfruzw');

    return new Promise<Image>((resolve, reject) => {
      this.http.post(this.url, data).pipe(
        catchError((error)=>{
          this.msg.error("Error al subir la imagen");
          reject(null);
          throw error;
        })
      ).subscribe((response: any)=>{
        let img = new Image();
        img.alt = response.original_filename;
        img.url = response.secure_url;

        resolve(img);
      });
    });
  }
}
