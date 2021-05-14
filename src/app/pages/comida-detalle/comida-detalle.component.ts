import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ItemCarrito } from '@models/itemCarrito.interface';
import { CarritoService } from '@services/carrito/carrito.service';

@Component({
  selector: 'app-comida-detalle',
  templateUrl: './comida-detalle.component.html',
  styleUrls: ['./comida-detalle.component.scss']
})
export class ComidaDetalleComponent implements OnInit {
  public btnDisabled: boolean = true;
  public food: ItemCarrito = {
    _id: 1,
    denominacion: 'Articulo Insumo',
    img: 'https://place-hold.it/700x400',
    precioVenta: 1000
  }

  constructor(private cartSvc: CarritoService, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAuth) {
      this.btnDisabled = true;
    }
  }

  public addItemCart(item: any, e: Event): void {
    // e.preventDefault();
    // let cartItem: ItemCarrito = {
    //   id: item.id,
    //   name: item.name,
    //   img: item.img,
    //   price: item.price,
    //   cant: 1
    // }
    // this.cartSvc.addItem(cartItem);
    // e.stopPropagation();
  }

}
