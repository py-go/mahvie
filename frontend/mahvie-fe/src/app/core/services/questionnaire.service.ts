import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  baseUrl: string;
  backButtonVisibility = new Subject<void>();
  backButtonClick = new Subject<void>();

  constructor(
    private http: HttpClient,
  ) { 
    this.baseUrl = environment.baseUrl;
  }
    
  /**
   * Posts current answers. Invoked on each 'continue' click event.
   */
  saveAnswer(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}post`, payload);
  }
}
