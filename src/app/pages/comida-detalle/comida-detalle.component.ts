import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from '@models/itemCarrito.interface';
import { CarritoService } from '@services/carrito/carrito.service';

@Component({
  selector: 'app-comida-detalle',
  templateUrl: './comida-detalle.component.html',
  styleUrls: ['./comida-detalle.component.scss']
})
export class ComidaDetalleComponent implements OnInit {
  public food: ItemCarrito = {
    id: 1,
    name: 'Articulo Insumo',
    img: 'https://place-hold.it/700x400',
    price: 1000,
    cant: 1
  }

  constructor(private cartSvc: CarritoService) { }

  ngOnInit(): void {
  }

  public addItemCart(item: any, e: Event): void {
    e.preventDefault();
    let cartItem: ItemCarrito = {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      cant: 1
    }
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }

}
