import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ItemCarrito } from "../../models/itemCarrito.interface";
import { AuthService } from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoBS = new BehaviorSubject<Array<ItemCarrito>>([]);
  public cart$ = this.carritoBS.asObservable();

  constructor(private auth: AuthService) { 
    let auxCart = JSON.parse(sessionStorage.getItem('cart'));
    if(this.auth.isAuth && (auxCart !== null) ){
      this.carritoBS.next(auxCart);
    }
  }

  public addItem(item: ItemCarrito) {
    let currentCart = this.carritoBS.getValue();
    if(currentCart) {
      let objIndex = currentCart.findIndex( (obj) => obj.id == item.id );

      if(objIndex != -1) {
        currentCart[objIndex].cant += 1;
      } else {
        currentCart.push(item)
      }
    } else {
      currentCart = [];
      currentCart.push(item);
    }

    this.persistCart(currentCart);
  }

  private persistCart(cart: ItemCarrito[]): void {
    this.carritoBS.next(cart);
    if(this.auth.isAuth && (this.carritoBS.getValue().length >= 0)) {
      sessionStorage.setItem('cart' , JSON.stringify(this.carritoBS.getValue()));
    }
  }

  public removeItem(item: ItemCarrito): void{
    let currentCart = this.carritoBS.getValue();

    if(currentCart) {
      let objId = currentCart.findIndex( (obj) => obj.id == item.id);

      if(currentCart[objId].cant >=2 ) {
        currentCart[objId].cant-=1;
      } else {
        this.deleteItem(item.id);
      }
    }
    this.persistCart(currentCart);
  }

  public deleteItem(itemId: ItemCarrito): void {
    let currentCart = this.carritoBS.getValue();
    let objIndex = currentCart.findIndex( (obj) => obj.id == itemId );

    if(objIndex != -1) {
      currentCart[objIndex].cant = 1;
      currentCart.splice(objIndex,1);
    }
    this.persistCart(currentCart);
  }

  public deleteCart(): void {
    this.carritoBS.next(null);
    sessionStorage.removeItem('cart');
  }
}
// https://www.sebastianbauer.dev/2019/12/11/carrito-reactivo-con-angular-y-rxjs/ (referencia)