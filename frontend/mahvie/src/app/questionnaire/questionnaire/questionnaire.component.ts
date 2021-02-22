<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ApiServicesService } from '../../core/services/api-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  submitBtn:any=true;
  formSection:number=1;

  questionForm = new FormGroup({
    location: new FormControl(''),
  });


  constructor(private apiServicesService:ApiServicesService,private _snackBar: MatSnackBar) { 
   
  }

  ngOnInit(): void {

    this.apiServicesService.getConfig().subscribe(data=>{
      console.log(data);
    })
  }

  submit(){
    this.formSection=2;
    this.submitBtn=true;
  }

  checkSelected(val:any){

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
=======
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ApiServicesService } from '../../core/services/api-services.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  submitBtn:any=true;
  formSection:number=1;

  questionForm = new FormGroup({
    location: new FormControl(''),
  });


  constructor(private apiServicesService:ApiServicesService,private _snackBar: MatSnackBar) { 
   
  }

  ngOnInit(): void {

    this.apiServicesService.getConfig().subscribe(data=>{
      console.log(data);
    })
  }

  submit(){
    this.formSection=2;
    this.submitBtn=true;
  }

  checkSelected(val:any){

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
>>>>>>> frontend
