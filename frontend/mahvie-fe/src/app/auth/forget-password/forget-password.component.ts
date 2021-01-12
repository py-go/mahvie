import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertboxService } from '../../shared/services/alertbox.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { ConstantService } from 'src/app/config/constant.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: any;
  resetForm: any;
  submitClicked = false;
  sectionSwitch = 'forget';
  tokenValue: any = null;
  tokenValid = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertboxService: AlertboxService,
    private router: Router,
    private routes: ActivatedRoute,
    private loaderService: LoaderService,
    private constants: ConstantService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.tokenValue = this.routes.snapshot.queryParams['token'];
    this.tokenValue
      ? (this.sectionSwitch = 'reset')
      : (this.sectionSwitch = 'forget');
    this.forgetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.constants.emailRegex),
        ],
      ],
    });
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.validateToken(this.tokenValue);
  }

  onSubmit(params: string) {
    this.loaderService.showLoader();
    this.submitClicked = true;
    if (params == 'forget') {
      if (this.forgetForm.status == 'VALID') {
        this.authService.resetPassword(this.forgetForm.value).subscribe(_ => {
          this.alertboxService.showAlert('success', 'please verify your email');
          this.router.navigate(['']);
          this.loaderService.hideLoader();
        });
      }
    } else {
      if (this.resetForm.status == 'VALID') {
        this.authService.confirmPassword(this.resetForm.value).subscribe(_ => {
          this.alertboxService.showAlert('success', 'password reset successfull');
          this.router.navigate(['']);
          this.loaderService.hideLoader();
        });
      }
    }
  }

  validateToken(token: string) {
    if (token) {
      this.authService.validateToken({ token: token }).subscribe(_ => {
        this.tokenValid = true;
      },
      (err) => {
        this.alertboxService.showAlert('error', 'invalid token');
        this.router.navigate(['']);
      });
    }
  }
}
