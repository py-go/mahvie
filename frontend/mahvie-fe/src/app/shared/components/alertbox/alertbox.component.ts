import { Component, OnInit } from '@angular/core';
import { AlertboxService } from '../../services/alertbox.service';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements OnInit {

  localServiceVar:any;

  constructor(private alertboxService:AlertboxService) { 
    this.localServiceVar = this.alertboxService.alertSubject.subscribe(
      (data)=>{
        this.localServiceVar = data;
      }
    )
  }

  ngOnInit(): void {
    this.localServiceVar = this.alertboxService.show;
  }

}
