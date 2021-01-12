import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertboxService } from '../../shared/services/alertbox.service';
import { LoaderService } from '../../shared/services/loader.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertboxService: AlertboxService,
    private router: Router,
    private cookieService: CookieService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.cookieService.delete('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.loginForm.status == 'VALID') {
      this.loaderService.showLoader();
      this.authService.loginUser(this.loginForm.value).subscribe(data => {
        this.loaderService.hideLoader();
        this.alertboxService.showAlert('success', 'login successfull');
        this.cookieService.set('token', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.loaderService.hideLoader();
        this.alertboxService.showAlert('error', 'login failed');
      });
    }
  }
}
