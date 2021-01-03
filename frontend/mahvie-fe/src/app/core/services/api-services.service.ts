import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  baseUrl:any = 'https://product-dev-phase-1.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  postData(url:any,data:any){
    return this.http.post(this.baseUrl+url,data);
  }
}
