import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertboxService {

  show:any={type:'',text:''};
  alertSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showAlert(type:string,text:string){
    this.show.type=type;
    this.show.text=text;
    this.alertSubject.next(this.show);
    setTimeout(()=>{
      this.show={type:'',text:''};
      this.alertSubject.next(this.show);
    },3000)
  }
}
