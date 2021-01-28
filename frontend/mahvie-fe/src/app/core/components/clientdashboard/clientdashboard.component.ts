import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  constructor(
    public cookieService: CookieService,
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
