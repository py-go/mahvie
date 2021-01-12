import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantService } from '@config/constant.service';
import { AlertboxService } from '@services/alertbox.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertboxService: AlertboxService,
    private router: Router,
    private constantService: ConstantService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.constantService.emailRegex)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(this.constantService.numbersOnly)]],
    });
  }

  onSubmit() {
    this.authService.registerUser(this.registerForm.value).subscribe(_ => {
      this.alertboxService.showAlert('success', 'New user registered');
      this.router.navigate(['']);
    });
  }
}
