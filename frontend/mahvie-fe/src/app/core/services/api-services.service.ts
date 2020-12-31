import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  baseUrl:any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postData(url:any,data:any){
    return this.http.post(this.baseUrl+url,data);
  }
}
