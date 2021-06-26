import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Pedido } from '@models/pedido.interface';
import { GenericService } from '@services/generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends GenericService<Pedido> {
  URL: string = "http://localhost:2021/api/v1/pedido";


  constructor(private http: HttpClient) {
    super(http)
  }

  public getAllPedidoByUser(uid: any): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.URL}/byUsers/${uid}`)
  }
  public cancelPedido(uid:any,motivo:any): Observable<Pedido>{
    return this.http.put<Pedido>(`${this.URL}/cancel/${uid}`,motivo);
  }

}
