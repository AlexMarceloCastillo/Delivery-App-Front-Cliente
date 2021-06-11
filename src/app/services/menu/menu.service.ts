import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  private URL_API: string = "http://localhost:2021/api/v1/menu";

  public getAllMenu(): Observable<any[]>{
    return this.http.get<any[]>(this.URL_API)
  }

  public search(query:string): Observable<any[]>{
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get<any[]>(this.URL_API,{params: params})
  }
}
