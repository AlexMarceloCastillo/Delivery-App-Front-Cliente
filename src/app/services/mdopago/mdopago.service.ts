import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MdopagoService {

  private URL_API: string = "http://localhost:2021/api/v1/mdopago";

  constructor(private http: HttpClient) { }

  public createCheckout(dataCheckout:any ): Observable<any>{
    return this.http.post<any>(this.URL_API+"/checkout",dataCheckout)
  }

  public getPagoStatus(idPedido: string){
    return this.http.get<any>(this.URL_API+"/reference/"+idPedido)
  }
}
