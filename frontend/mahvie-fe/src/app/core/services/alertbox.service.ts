import { Injectable } from '@angular/core';
import { Alert, AlertTypes } from '@models/core.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertboxService {
  alertSubject$: Subject<Alert> = new Subject<Alert>();
  show: Alert = {
    type: '',
    text: '',
  };

  constructor() {}

  showAlert(type: AlertTypes, text: string) {
    this.show.type = type;
    this.show.text = text;
    this.alertSubject$.next(this.show);
    setTimeout(() => {
      this.show = { type: '', text: '' };
      this.alertSubject$.next(this.show);
    }, 3000);
  }
}
