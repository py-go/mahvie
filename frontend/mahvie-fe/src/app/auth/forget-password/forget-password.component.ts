import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiServicesService } from '../../core/services/api-services.service';
import { AlertboxService } from '../../shared/services/alertbox.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService} from "../../shared/services/loader.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm:any;
  resetForm:any;
  submitClicked:boolean=false;
  sectionSwitch:string='forget';
  tokenValue:any=null;
  tokenValid:boolean=false;

  constructor(
    private fb: FormBuilder,
    private apiServicesService: ApiServicesService,
    private alertboxService : AlertboxService,
    private router:Router,
    private routes:ActivatedRoute,
    private loaderService:LoaderService
  ) { }

  ngOnInit(): void {
    this.tokenValue = this.routes.snapshot.queryParams['token'];
    (this.tokenValue)?this.sectionSwitch='reset':this.sectionSwitch='forget';
    this.forgetForm = this.fb.group({
      email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
    this.resetForm = this.fb.group({
      password: ['',Validators.required]
    })
    this.validateToken(this.tokenValue);
  }

  onSubmit(params:string){
    this.loaderService.showLoader();
    this.submitClicked=true;
    if(params=='forget'){
      if(this.forgetForm.status=="VALID"){
        this.apiServicesService.postData('auth/password_reset/reset_password/',this.forgetForm.value).subscribe(
          (data)=>{
            this.alertboxService.showAlert('success','please verify your email')
            this.router.navigate([''])
            this.loaderService.hideLoader();
          },
          (err)=>{
          }
        )
      }
    }
    else{
      if(this.resetForm.status=="VALID"){
        this.apiServicesService.postData('auth/password_reset/confirm/',this.resetForm.value).subscribe(
          (data)=>{
            this.alertboxService.showAlert('success','password reset successfull')
            this.router.navigate([''])
            this.loaderService.hideLoader();
          },
          (err)=>{
          }
        )
      }
    }
  }

  validateToken(token:string){
    if(token){
      this.apiServicesService.postData('auth/password_reset/validate_token/',{"token":token}).subscribe(
        (data)=>{
          this.tokenValid = true;
        },
        (err)=>{
          this.alertboxService.showAlert('error','invalid token')
          this.router.navigate([''])
        }
      )
    }
  }

}
