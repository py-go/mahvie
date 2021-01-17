import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  emailRegex: string;
  numbersOnly: string;

  constructor() {
    this.emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.numbersOnly = '^[0-9]*$';
  }
}
