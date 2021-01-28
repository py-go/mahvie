import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { UserTokens, ConfirmPassword, Login, Register, ResetPassword, Token } from '@models/core.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  loginUser(payload: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/token/`, payload);
  }

  registerUser(payload: Register): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/register/`, payload);
  }

  resetPassword(payload: ResetPassword): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/password_reset/reset_password/`, payload);
  }

  confirmPassword(payload: ConfirmPassword): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/password_reset/confirm/`, payload);
  }

  validateToken(payload: Token): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/password_reset/validate_token/`, payload);
  }

  isUserLoggedIn(): boolean {
    return this.cookieService.check('user-tokens');
  }

  getUserCredentails(): UserTokens {
    return JSON.parse(this.cookieService.get('user-tokens'));
  }

  logoutUser(): void {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('');
  }

  setUserTokens(response: UserTokens): void {
    this.cookieService.set('user-tokens', JSON.stringify(response));
  }

  setAccessToken(tokenValue: string): void {
    const newTokens = {
      ...JSON.parse(this.cookieService.get('user-tokens')),
      access: tokenValue
    };
    this.cookieService.delete('user-tokens');
    this.cookieService.set('user-tokens', JSON.stringify(newTokens));
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/token/refresh/`, { refresh: this.getUserCredentails().refresh });
  }
}
