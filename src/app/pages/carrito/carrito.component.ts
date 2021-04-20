import { Component, OnInit } from '@angular/core';

import { ItemCarrito } from '../../models/itemCarrito.interface';
import { CarritoService } from "../../services/carrito/carrito.service";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  public total:number;
  public subTotal:number;
  public itemsCart: ItemCarrito[];
  public sessionCart: ItemCarrito[];

  constructor( private carritoSvc:CarritoService ) { }

  ngOnInit(): void {
    this.carritoSvc.cart$.subscribe( cart => {
      try {
        this.itemsCart = cart;
        this.subTotal = cart.reduce( (sum, current) => sum + (current.price*current.cant),0);
      } catch (error) {
        this.subTotal = 0;
      }
    });
    this.sessionCart = JSON.parse(sessionStorage.getItem('cart'));
  }

  /**
   * Elimina un item del carrito permanentemente
   * @param id: Id de un elemento
   * @param e: Event
   */
  public deleteItemCart(id: any,e:Event) {
    e.preventDefault();
    this.carritoSvc.deleteItem(id);
  }

  /**
   * Aumenta la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public plus(item:ItemCarrito,e:Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.carritoSvc.addItem(item);
  }

  /**
   * Disminuye la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public minus(item:ItemCarrito,e:Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.carritoSvc.removeItem(item);
  }
}
