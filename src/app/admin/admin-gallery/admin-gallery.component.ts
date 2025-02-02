import { Component, OnInit } from '@angular/core';
import { GallerylistComponent } from './gallerylist/gallerylist.component';
import { GalleryserviceService } from 'src/app/services/galleryservice.service';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {
  selecetdFile : File;
  title
  description
  error
  loading: boolean;
  progress: number;
  errormessege: string;
    onFileUpload(event){
    this.selecetdFile = event.target.files[0];
}
  constructor( private galleryservice : GalleryserviceService ,private galleryelist:GallerylistComponent,private toastr: ToastrService) { }

  ngOnInit() {
  }

upload(){
  console.log("",this.title)
  if (this.title == undefined ||''||null) {
      this.error="please enter title"
      this.toastr.error('Please enter title','',{
        timeOut: 1000
      });
  }
  else if(this.selecetdFile==undefined||null){
    this.error="please Select File"
    this.toastr.error('Please Select File','',{
      timeOut: 1000
    });
  }
   else {
    this.loading = true
    const data = new FormData();
    data.append('image', this.selecetdFile);
    data.append('title', this.title);
    data.append('description',this.description);
    this.uploadfile(data)
  }
  
}
uploadfile(data){
  this.loading=true
  this.galleryservice.gallryupload(data).subscribe(event => {
   if (event.type === HttpEventType.UploadProgress) {
     this.progress = Math.round(100 * event.loaded / event.total);
     }
   if (event.type === HttpEventType.Response) {
     this.title = null
     this.description = null
     this.selecetdFile = null;
    this.loading=false
    this.toastr.success('Image Uploaded successfully');
    console.log(event.body)
     }
    },(err: any) => {
  this.loading=false
  this.progress = 0
  this.errormessege = "Check YOu Netwrok Connnection"
  });
  }
}