import { Component, OnInit, Input } from '@angular/core';

import { CarritoService } from '@services/carrito/carrito.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { AuthService } from '@auth/services/auth.service';
import { ArtManufacturado } from '@models/artManufact.interface';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public btnDisabled: boolean = true;

  @Input() element: ItemCarrito[];


  constructor(private cartSvc: CarritoService, private auth: AuthService) { }


  ngOnInit(): void { 
    if(this.auth.isAuth) {
      this.btnDisabled = true;
    }
  }

  public addItemCart(food: any, e: Event): void {
    e.preventDefault();
    let { _id, denominacion, tiempoEstimado, precioVenta, img  } = food;
    let cartItem: ItemCarrito = {_id, denominacion, tiempoEstimado, precioVenta, img, cantidad: 1};
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }
}