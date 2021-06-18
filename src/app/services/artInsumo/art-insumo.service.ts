import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtInsumoService {
  private URL_API: string = "http://localhost:2021/api/v1/artin";
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_API);
  }

  public getOne(id: any): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/${id}`);
  }
}
