import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  backButtonVisibility = new Subject<void>();
  backButtonClick = new Subject<void>();

  constructor() {}
}
