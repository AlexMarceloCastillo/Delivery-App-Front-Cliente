import { Component, OnInit, Input } from '@angular/core';

import { CarritoService } from '@services/carrito/carrito.service';

import { ItemCarrito } from '@models/itemCarrito.interface';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public btnDisabled: boolean = true;

  @Input() element: ItemCarrito;


  constructor(private cartSvc: CarritoService) { }


  ngOnInit(): void { }

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
