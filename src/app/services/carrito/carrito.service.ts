import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ItemCarrito } from "@models/itemCarrito.interface";
import { AuthService } from "@auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoBS = new BehaviorSubject<Array<ItemCarrito>>([]);
  public cart$ = this.carritoBS.asObservable();


  constructor( private auth: AuthService ) { 
    let auxCart = JSON.parse(sessionStorage.getItem('cart'));
    if(this.auth.isAuth && (auxCart !== null) ){
      this.carritoBS.next(auxCart);
    }
  }


  private persistCart(cart: ItemCarrito[]): void {
    this.carritoBS.next(cart);
    if(this.auth.isAuth && (this.carritoBS.getValue().length >= 0)) {
      sessionStorage.setItem('cart' , JSON.stringify(this.carritoBS.getValue()));
    }
  }

  public addItem(item: ItemCarrito) {
    let currentCart = this.carritoBS.getValue();
    if(currentCart) {
      let objIndex = currentCart.findIndex( (obj) => obj._id == item._id );

      if(objIndex != -1) {
        // Limita la cantidad de items del mismo tipo
        if (currentCart[objIndex].cantidad < 5) {
          currentCart[objIndex].cantidad += 1;
        }
      } else {
        currentCart.push(item)
      }
    } else {
      currentCart = [];
      currentCart.push(item);
    }
    this.persistCart(currentCart);
  }

  public removeItem(item: ItemCarrito): void{
    let currentCart = this.carritoBS.getValue();

    if(currentCart) {
      let objId = currentCart.findIndex( (obj) => obj._id == item._id);

      if(currentCart[objId].cantidad >=2 ) {
        currentCart[objId].cantidad-=1;
      } else {
        this.deleteItem(item._id);
      }
    }
    this.persistCart(currentCart);
  }

  public deleteItem(itemId: ItemCarrito): void {
    let currentCart = this.carritoBS.getValue();
    let objIndex = currentCart.findIndex( (obj) => obj._id == itemId );

    if(objIndex != -1) {
      currentCart[objIndex].cantidad = 1;
      currentCart.splice(objIndex,1);
    }
    this.persistCart(currentCart);
  }

  public emptyCart(): void {
    this.carritoBS.next([]);
    sessionStorage.removeItem('cart');
  }
}
// https://www.sebastianbauer.dev/2019/12/11/carrito-reactivo-con-angular-y-rxjs/ (referencia)