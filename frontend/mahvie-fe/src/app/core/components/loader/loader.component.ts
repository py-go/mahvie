import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  showLoader: boolean;
  subsink = new SubSink();

  constructor(
    private loaderService: LoaderService,
  ) {
    this.showLoader = false;
    this.subsink.sink = this.loaderService.loaderSubject.subscribe(data => this.showLoader = data);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
