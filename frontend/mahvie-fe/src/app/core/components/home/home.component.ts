import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public cookieService: CookieService,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
