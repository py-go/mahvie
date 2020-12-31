import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  show:boolean=false;
  loaderSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showLoader(){
    this.show=true;
    this.loaderSubject.next(this.show);
  }

  hideLoader(){
    this.show=false;
    this.loaderSubject.next(this.show);
  }
}
