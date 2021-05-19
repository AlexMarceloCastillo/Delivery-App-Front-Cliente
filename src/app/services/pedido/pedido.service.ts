import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Pedido } from '@models/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private URL_API: string = "http://localhost:2021/api/v1/pedido";


  constructor(private http: HttpClient) { }

  
  public getOnePedido(pid: any): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.URL_API}/${pid}`);
  }

  public savePedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.URL_API,pedido);
  }
}
