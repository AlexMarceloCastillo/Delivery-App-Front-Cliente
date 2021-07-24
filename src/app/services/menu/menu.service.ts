import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  private URL_API: string = "http://localhost:2021/api/v1/menu";

  public getAllMenu(limit:number, skip: number): Observable<any[]>{
    let params = new HttpParams();
    params = params.append('limit', limit);
    params = params.append('skip', skip);
    return this.http.get<any[]>(this.URL_API,{params: params})
  }

  public getOneMenu(id: any): Observable<any>{
    return this.http.get<any>(`${this.URL_API}/${id}`);
  }

  public search(query:string, filter:string = ''): Observable<any[]>{
    let params = new HttpParams();
    params = params.append('search', query);
    params = params.append('filter', filter);
    return this.http.get<any[]>(this.URL_API,{params: params})
  }
}
