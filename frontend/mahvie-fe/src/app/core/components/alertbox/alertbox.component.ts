import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Alert } from '@models/core.model';
import { AlertboxService } from '@services/alertbox.service';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css'],
})
export class AlertboxComponent implements OnInit, OnDestroy {
  alertInfo!: Alert;
  subsink = new SubSink();

  constructor(
    private alertboxService: AlertboxService,
  ) {
    this.subsink.sink = this.alertboxService.alertSubject$
      .subscribe((data: Alert) => this.alertInfo = data);
  }

  ngOnInit(): void {
    this.alertInfo = this.alertboxService.show;
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
