import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GalleryserviceService } from 'src/app/services/galleryservice.service';

@Component({
  selector: 'app-gallerylist',
  templateUrl: './gallerylist.component.html',
  styleUrls: ['./gallerylist.component.css']
})
export class GallerylistComponent implements OnInit {
  sliderArray 
  delteDilog = false
  modalRef: BsModalRef;
  id:number
  p
  constructor(private galleryservice:GalleryserviceService,private modalService: BsModalService) { }

  ngOnInit() {
      this.refresh()
  }
  delet(id,template){
      this.id=id
      this.openModal(template)   
  }
  /*DialougBox*/
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    this.galleryservice.gallerydelete(this.id).subscribe(res =>{
      console.log("Deleted")
      this.refresh()
    })
    this.modalRef.hide();
  }
  decline(): void {
    this.modalRef.hide();
  }
  refresh(){
    this.sliderArray  = this.galleryservice.gallerylist()
    console.log("Refreshed ")
  }
}
