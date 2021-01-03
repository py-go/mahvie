import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { elementAt } from 'rxjs/operators';
import { ApiServicesService } from '../../core/services/api-services.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  questionSet:any=[
    {slno:1,name:"live",question:"Do you live in Ontario?",type:"radio",options:[{value:"yes",active:false},{value:"no",active:false}],validations:{},title:"Before we get started...",subtitle:""},
    {slno:2,name:"email",question:"What is your email?",type:"text",options:["email address"],validations:{},title:"Before we get started...",subtitle:"",skip:true},
    {slno:3,name:"names",question:"",type:"text",options:["first name","last name"],validations:{},title:"Lets get to know you!",subtitle:"",inline:true},
    {slno:5,name:"gender",question:"",type:"radio",options:[{value:"male",active:false},{value:"female",active:false}],validations:{},title:"What is your gender?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:6,name:"children",question:"",type:"radio",options:[{value:"yes",active:false},{value:"no",active:false}],validations:{},title:"Do you have any children?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:7,name:"income",question:"",type:"slider",options:["annual income"],validations:{"min":0,"max":500000},title:"What is your annual income?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:8,name:"mortgage",question:"",type:"slider",options:["mortgage"],validations:{"min":0,"max":500000},title:"What is your total mortgage outstanding?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:9,name:"expenses",question:"",type:"slider",options:["monthly expenses"],validations:{"min":0,"max":500000},title:"What is your monthly expenses excluding your mortgage?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:10,name:"born",question:"",type:"date",options:[],validations:{},title:"When were you born?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:11,name:"smoke",question:"",type:"radio",options:[{value:"yes",active:false},{value:"no",active:false}],validations:{},title:"Have you smoked in the last 12 months?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:12,name:"names2",question:"",type:"text",options:["first name","last name"],validations:{},title:"Welcome to G2G,your recommendation is only minutes away!",subtitle:"",inline:true},
    {slno:4,name:"products",question:"",type:"div",options:[],validations:{},title:"Which product(s) match your preferences?",subtitle:"Please select all products that match your needs."},
    {slno:13,name:"gettoknow",question:"",type:"div2",options:[],validations:{},title:"Great, let's get to know you!",subtitle:"We'll recommend your coverage amount and policy length by assessing"},
  ]

  submitBtn:any=true;
  formSection:number=1;
  currentQuestion:any;
  sliderValue:any=0;
  events:any;
  date:any;
  month:any;
  year:any;

  questionForm = new FormGroup({
    
  });


  constructor(private apiServicesService:ApiServicesService) { 
   
  }

  ngOnInit(): void {

    // this.apiServicesService.getConfig().subscribe(data=>{
    //   console.log(data);
    // })
    this.assignQuestions();

    this.questionSet.forEach((element:any) => {
     this.questionForm.addControl(element.name, new FormControl(''))
    });

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events=(`${type}: ${event.value}`);
    this.date = new Date(this.events).getDate();
    this.month = new Date(this.events).getMonth()+1;
    this.year = new Date(this.events).getFullYear();
  }

  submit(){
    this.formSection+=1;
    this.assignQuestions();
  }

  checkSelected(val:any){

  }

  activeSetter(index:any,options:Array<any>){
    options.forEach(element=>{
      element.active=false;
    })
    options[index].active=true;
  }


  assignQuestions(){
    if(this.questionSet){
      this.questionSet.forEach((element:any) => {
        if(this.formSection==element.slno){
          this.currentQuestion=element;
        }
      });
    }
  }

}
