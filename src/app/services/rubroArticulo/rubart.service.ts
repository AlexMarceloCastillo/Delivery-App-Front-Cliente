import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RubartService {
  private URL_API: string = "http://localhost:2021/api/v1/rubroarticulo";


  constructor(private http: HttpClient) { }


  public getOneRubArt(id: any): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/${id}`);
  }
}
