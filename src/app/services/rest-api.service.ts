import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = "http://localhost:8081/"

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(public http: HttpClient) { }

  async dropCards(){
    return this.http.get<any>(url + "drop");
  }
}
