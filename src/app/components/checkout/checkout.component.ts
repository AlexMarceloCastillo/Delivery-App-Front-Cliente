import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from "@services/carrito/carrito.service";
import { FormDataBuildService } from '@shared/services/form-data-build.service';
import { PedidoService } from '@services/pedido/pedido.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { Cliente } from '@models/cliente.interface';
import { Pedido } from '@models/pedido.interface';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, DoCheck, OnDestroy {

  private cartSuscription: Subscription;
  private itemsCart: ItemCarrito[];
  public subTotal: number = 0;

  private usuario: Cliente;

  constructor( 
    private carritoSvc:CarritoService, private authSvc: AuthService, private formBuilder: FormBuilder,
    private pedidoSvc: PedidoService, private router: Router
  ) { 
    this.authSvc.getDataClient().subscribe( user => { 
      this.usuario = user;
    }, error => console.error(error) );
  }


  ngOnInit(): void { 
    this.cartSuscription = this.carritoSvc.cart$.subscribe( cart => { 
      this.itemsCart = cart;
      this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);
    }, error => console.error(error) );
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    this.cartSuscription.unsubscribe();
  }

  
  // public onSavePedido(e: Event): void {
  //   let horaEstimadaFin = this.itemsCart.reduce((sum,item)=> sum + (item.tiempoEstimado)*item.cantidad,0);
  //   let itemsPedido: any = [];

  //   this.itemsCart.forEach( item => {
  //     let aux = {
  //       cantidad: item.cantidad,
  //       subTotal: item.cantidad*item.precioVenta,
  //       ArtManufact: { _id: item._id}
  //     };
  //     itemsPedido.push(aux);
  //   });

  //   let pedido: Pedido = {
  //     Cliente: {
  //       id: this.user.uid,
  //       Domicilio: this.parentDomicilioForm.value
  //     },
  //     horaEstimadaFin,
  //     estado: 'en espera',
  //     total: this.checkoutForm.value.subtotal,
  //     fecha: new Date(),
  //     tipoEnvio: this.parentDomicilioForm.value.local? 0 : 1,
  //     DetallePedido: itemsPedido
  //   }

  //   this.pedidoSvc.savePedido(pedido).toPromise()
  //     .then(data => {
  //       this.carritoSvc.emptyCart();
  //       this.router.navigate([this.user.uid, 'pedidos', data._id]);
  //     })
  //     .catch(e=>console.error(e))
  // }
}