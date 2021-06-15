import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubGralService {

  private URL_API: string = "http://localhost:2021/api/v1/rubrogeneral";


  constructor(private http: HttpClient) { }


  public getAllRubroGnral(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}`);
  }
}
