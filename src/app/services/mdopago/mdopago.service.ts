import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '@services/generic/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MdopagoService extends GenericService<any> {

  URL: string = "http://localhost:2021/api/v1/mdopago";

  constructor(private http: HttpClient) {
    super(http)
  }

  public createCheckout(dataCheckout:any ): Observable<any>{
    return this.http.post<any>(this.URL+"/checkout",dataCheckout)
  }

  public getPagoStatus(idPedido: string){
    return this.http.get<any>(this.URL+"/reference/"+idPedido)
  }
}
