import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnswersServiceService } from 'src/app/services/student/answers-service.service';
import { AnswerssComponent } from '../answerss.component';

@Component({
  selector: 'app-new-answers',
  templateUrl: './new-answers.component.html',
  styleUrls: ['./new-answers.component.css']
})
export class NewAnswersComponent implements OnInit {
  submitted: boolean;
  selecetdFile: any;
  error: string;
  title
  desciption
  loading:Boolean
  constructor(private formBuilder:FormBuilder,private answerservice:AnswersServiceService,private adminanswer:AnswerssComponent) { }
  ngOnInit() {
  }
  onFileUpload(event){
    let file = event.target.files[0];
    if (file.type == 'application/pdf' ) {
      this.error = null
     this.selecetdFile = event.target.files[0];
 } else {
   this.error="Please Upload Pdfs Only"
 }     
}
upload(){
  console.log("",this.title)
  if (this.title == undefined ||''||null) {
      console.warn("please enter title")
      this.error="please enter title"
  }
  else if(this.selecetdFile==undefined||null){
    this.error="please Select File"
  }
   else {
     this.loading = true
    const data = new FormData();
    data.append('title', this.title);
    data.append('desciption',this.desciption);
    data.append('answer', this.selecetdFile);
      this.answerservice.answerUpload(data).subscribe(res=>{
        this.title = ''
        this.desciption = ''
        this.selecetdFile = null
        this.adminanswer.refresh()
        this.loading=false
      })
  }
}
}
