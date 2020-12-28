import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ApiServicesService } from '../../core/services/api-services.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  questionSet:any=[
    {slno:1,name:"live",question:"Do you live in Ontario?",type:"radio",options:["yes","no"],validations:{},title:"Before we get started...",subtitle:""},
    {slno:2,name:"email",question:"What is your email?",type:"text",options:["email address"],validations:{},title:"Before we get started...",subtitle:"",skip:true},
    {slno:3,name:"names",question:"",type:"text",options:["first name","last name"],validations:{},title:"Lets get to know you!",subtitle:"",inline:true},
    {slno:4,name:"gender",question:"",type:"radio",options:["male","female"],validations:{},title:"What is your gender?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:5,name:"children",question:"",type:"radio",options:["yes","no"],validations:{},title:"Do you have any children?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:6,name:"income",question:"",type:"slider",options:["annual income"],validations:{"min":0,"max":500000},title:"What is your annual income?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:7,name:"mortgage",question:"",type:"slider",options:["mortgage"],validations:{"min":0,"max":500000},title:"What is your total mortgage outstanding?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:8,name:"expenses",question:"",type:"slider",options:["monthly expenses"],validations:{"min":0,"max":500000},title:"What is your monthly expenses excluding your mortgage?",subtitle:"Feel free to use close estimates when it comes to your finances."},
    {slno:9,name:"born",question:"",type:"date",options:[],validations:{},title:"When were you born?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:10,name:"smoke",question:"",type:"radio",options:["yes","no"],validations:{},title:"Have you smoked in the last 12 months?",subtitle:"Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation."},
    {slno:11,name:"names2",question:"",type:"text",options:["first name","last name"],validations:{},title:"Welcome to G2G,your recommendation is only minutes away!",subtitle:"",inline:true},
  ]

  submitBtn:any=true;
  formSection:number=1;
  currentQuestion:any;

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

  submit(){
    this.formSection+=1;
    this.assignQuestions();
  }

  checkSelected(val:any){

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
