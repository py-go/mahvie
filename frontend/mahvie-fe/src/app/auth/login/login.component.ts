import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AlertboxService } from '@services/alertbox.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertboxService: AlertboxService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.cookieService.delete('user-tokens');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      this.alertboxService.showAlert('success', 'Login successful');
      this.cookieService.set('user-tokens', JSON.stringify(data));
      this.router.navigate(['/dashboard']);
    });
  }
}
