import { Component, OnInit, OnDestroy } from '@angular/core';
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

import guaymallen from '@assets/json/guaymallen.json';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public btnDisabled: boolean = false;

  private cartSuscription: Subscription;
  public itemsCart: ItemCarrito[];
  public subTotal: number = 0;

  public step: number = 0;
  public mostrar = false;
  
  public guaymallen = guaymallen;


  public retiroLocal: boolean = true;

  public parentDomicilioForm: FormGroup;
  public checkoutForm: FormGroup;

  private user:Cliente;


  constructor( 
    private carritoSvc:CarritoService, private auth: AuthService, 
    private formDataBuildSvc: FormDataBuildService, private formBuilder: FormBuilder,
    private pedidoSvc: PedidoService, private router: Router
  ) { }


  ngOnInit(): void {
    this.cartSuscription = this.carritoSvc.cart$.subscribe( cart => { 
      this.itemsCart = cart;
      this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);
    }, error => console.error(error) );

    this.auth.getDataClient().subscribe( user => {
      this.user = user;
      this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
    }, error => console.error(error));

    this.checkoutFormBuilder();
  }

  ngOnDestroy(): void {
    this.cartSuscription.unsubscribe();
  }


  public handleCheckChange(e: any): void {
    if (e.currentTarget.checked) {
      this.retiroLocal = true;
      let desc = this.subTotal*0.10;
      this.updateCheckoutForm(desc);
    } else {
      this.retiroLocal = false;
      this.updateCheckoutForm();
    }
  }

  public next(e: Event): void {
    e.preventDefault();
    this.step+=1;
  }
  public back(e: Event): void {
    e.preventDefault();
    this.step-=1;
  }

  public deleteCart(e:Event): void {
    e.preventDefault();
    this.carritoSvc.emptyCart();
    location.reload();
  }


  private checkoutFormBuilder(): void {
    let aux = this.subTotal*0.10;
    this.checkoutForm = this.formBuilder.group({
      subtotal: [ this.subTotal ],
      desc: [ aux ],
      total: [ this.subTotal-aux ]
    });
  }

  private updateCheckoutForm(desc: number=0): void{
    if(desc){
      this.checkoutForm.patchValue({ desc,total: this.subTotal-desc });
    } else {
      this.checkoutForm.patchValue({ desc,total: this.subTotal });
    }
  }

  public onSavePedido(e: Event): void {
    let horaEstimadaFin = this.itemsCart.reduce((sum,item)=> sum + (item.tiempoEstimado)*item.cantidad,0);
    let itemsPedido: any = [];

    this.itemsCart.forEach( item => {
      let aux = {
        cantidad: item.cantidad,
        subTotal: item.cantidad*item.precioVenta,
        ArtManufact: { _id: item._id}
      };
      itemsPedido.push(aux);
    });

    let pedido: Pedido = {
      Cliente: {
        id: this.user.uid,
        Domicilio: this.parentDomicilioForm.value
      },
      horaEstimadaFin,
      estado: 'no aprobado',
      total: this.checkoutForm.value.subtotal,
      fecha: new Date(),
      tipoEnvio: this.retiroLocal? 0 : 1,
      DetallePedido: itemsPedido
    }

    this.pedidoSvc.savePedido(pedido).toPromise()
      .then(data => {
        this.carritoSvc.emptyCart();
        this.router.navigate([this.user.uid, 'pedidos', data._id]);
      })
      .catch(e=>console.error(e))
  }
}