import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PedidoService } from "@services/pedido/pedido.service";

import { Pedido } from "@models/pedido.interface";


@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.scss']
})
export class ListaPedidoComponent implements OnInit {

  public userId: string = 'DUa0zPcgCjZwzoruJOhhQlNGtLy1';
  public orders: Pedido[];


  constructor(private pedidoSvc: PedidoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let uid = this.route.snapshot.paramMap.get('uid');
    this.pedidoSvc.getAllPedidoByUser(uid).subscribe( data => this.orders = data, error => console.error(error));
  }


  imprimir(id: string, e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    alert(`Imprimiendo factura ${id}`);
  }
}
