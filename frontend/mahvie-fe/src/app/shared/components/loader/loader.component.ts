import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  showLoader:any;

  constructor(
    private loaderService:LoaderService
  ) {
    this.showLoader = this.loaderService.loaderSubject.subscribe(
      (data)=>{
        this.showLoader = data;
      }
    )
   }

  ngOnInit(): void {
    this.showLoader = this.loaderService.show;
  }

}
