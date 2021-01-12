import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  showLoader: any;
  subsink = new SubSink();

  constructor(
    private loaderService: LoaderService,
  ) {
    this.subsink.sink = this.loaderService.loaderSubject.subscribe(data => this.showLoader = data);
  }

  ngOnInit(): void {
    this.showLoader = false;
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
