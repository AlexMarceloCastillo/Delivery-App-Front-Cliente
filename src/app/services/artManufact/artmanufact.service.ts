import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtManufacturado } from '@models/artManufact.interface';


@Injectable({
  providedIn: 'root'
})
export class ArtmanufactService {

  constructor(private http: HttpClient) { }

  private URL_API: string = "http://localhost:2021/api/v1/artmanu";


  public getAll(): Observable<ArtManufacturado[]> {
    return this.http.get<ArtManufacturado[]>(this.URL_API);
  }

  public getOne(id: any): Observable<ArtManufacturado> {
    return this.http.get<ArtManufacturado>(`${this.URL_API}/${id}`);
  }
}
