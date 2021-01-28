import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { LoaderService } from '@services/loader.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showLoader: boolean;
  subsink = new SubSink();

  constructor(
    private loaderService: LoaderService,
  ) {
    // disables console logs in production
    environment.production && (console.log = () => {})();
    this.showLoader = false;
  }

  ngOnInit(): void {
    this.subsink.sink = this.loaderService.loaderSubject.subscribe(data => this.showLoader = data);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
