import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private URL_API: string = "http://localhost:2021/api/v1/config";

  constructor(private httpClient: HttpClient) { }

  public getConfig():Observable<any>{
    return this.httpClient.get<any>(this.URL_API)
  }
}
