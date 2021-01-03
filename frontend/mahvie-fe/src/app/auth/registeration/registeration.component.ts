import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiServicesService } from '../../core/services/api-services.service';
import { AlertboxService } from '../../shared/services/alertbox.service';
import { Router } from '@angular/router';
import { LoaderService} from "../../shared/services/loader.service";

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm:any;
  submitClicked:boolean=false;


  constructor(
    private fb: FormBuilder,
    private apiServicesService: ApiServicesService,
    private alertboxService : AlertboxService,
    private router:Router,
    private loaderService:LoaderService

  ) { }

  ngOnInit():void{
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      phone_number: ['',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      password: ['',Validators.required]
    });
  }

  onSubmit(){
    this.submitClicked=true;
    if(this.registerForm.status=="VALID"){
      this.loaderService.showLoader();
      this.apiServicesService.postData('auth/register/',this.registerForm.value).subscribe(
        (data)=>{
          this.loaderService.hideLoader();
          this.alertboxService.showAlert('success','user created');
          this.router.navigate([''])
        },
        (err)=>{
          this.loaderService.hideLoader();
          this.alertboxService.showAlert('error','user created failed');
        }
      )
    }
  }

}
