import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from '@config/constant.service';
import { AlertboxService } from '@services/alertbox.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!: FormGroup;
  resetForm!: FormGroup;
  sectionSwitch = 'forget';
  tokenValue: any = null;
  tokenValid = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertboxService: AlertboxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantService: ConstantService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.tokenValue = this.activatedRoute.snapshot.queryParams['token'];
    this.tokenValue
      ? (this.sectionSwitch = 'reset')
      : (this.sectionSwitch = 'forget');
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required,  Validators.pattern(this.constantService.emailRegex)]],
    });
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.validateToken(this.tokenValue);
  }

  onSubmit(params: string) {
    if (params === 'forget') {
      this.authService.resetPassword(this.forgetForm.value).subscribe(_ => {
        this.alertboxService.showAlert('success', 'Please verify your email');
        this.router.navigate(['']);
      });
    } else {
      this.authService.confirmPassword(this.resetForm.value).subscribe(_ => {
        this.alertboxService.showAlert('success', 'Password reset successful');
        this.router.navigate(['']);
      });
    }
  }

  validateToken(token: string) {
    if (token) {
      this.authService.validateToken({ token: token }).subscribe(_ => {
        this.tokenValid = true;
      },
      (err) => {
        this.alertboxService.showAlert('error', 'Invalid token');
        this.router.navigate(['']);
      });
    }
  }
}
