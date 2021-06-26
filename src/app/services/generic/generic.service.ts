import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService <T> {
  public URL: string = '';

  constructor(private httpClient: HttpClient) { }

  public getOne(id: any) :Observable<T>{
    return this.httpClient.get<T>(`${this.URL}/${id}`);
  }
  public getAll() :Observable<T>{
    return this.httpClient.get<T>(this.URL);
  }
  public post(data:any) :Observable<T>{
    return this.httpClient.post<T>(this.URL,data);
  }

}
