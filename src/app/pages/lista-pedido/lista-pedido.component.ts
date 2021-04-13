import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.scss']
})
export class ListaPedidoComponent implements OnInit {

  public userId: string = 'DUa0zPcgCjZwzoruJOhhQlNGtLy1';
  public orders = [{
      id: "1234",
      estado: "Listo"
    },
    {
      id: "9254",
      estado: "Listo"
    },
    {
      id: "7234",
      estado: "cocina"
    }
  ];


  constructor() {}

  ngOnInit(): void {}


  imprimir(id: string, e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    alert(`Imprimiendo factura ${id}`);
  }
}
