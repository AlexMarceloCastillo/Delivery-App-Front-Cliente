import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from "@services/carrito/carrito.service";
import { FormDataBuildService } from '@shared/services/form-data-build.service';
import { PedidoService } from '@services/pedido/pedido.service';

import { ItemCarrito } from '@models/itemCarrito.interface';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  public itemsCart: ItemCarrito[];
  public sessionCart: ItemCarrito[];
  public cliente: any;

  // <Form>
  public total:number = 0;
  public subTotal:number;
  public efectivo: boolean;
  public mdoPago: boolean;
  // </Form>

  public parentDomicilioForm: FormGroup;

  constructor( private carritoSvc:CarritoService, private auth: AuthService, private formDataBuildSvc: FormDataBuildService ) { }

  ngOnInit(): void {
    this.carritoSvc.cart$.subscribe( cart => {
        this.itemsCart = cart;
        this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);
    }, error => { this.subTotal = 0, console.error(error) });
    this.sessionCart = JSON.parse(sessionStorage.getItem('cart'));
    this.auth.getDataClient().subscribe( user => {
      this.cliente = user;
      this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
    }, error => console.error(error) );
    
  }

  /**
   * Elimina un item del carrito permanentemente
   * @param id: Id de un elemento
   * @param e: Event
   */
  public deleteItemCart(id: any, e: Event): void{
    e.preventDefault();
    this.carritoSvc.deleteItem(id);
  }

  /**
   * Aumenta la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public plus(item: ItemCarrito, e: Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.carritoSvc.addItem(item);
  }

  /**
   * Disminuye la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public minus(item: ItemCarrito, e: Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.carritoSvc.removeItem(item);
  }

  /**
   * Vacia el carrito
   * @param e: Event
   */
  public deleteCart(e: Event): void {
    e.preventDefault();
    this.carritoSvc.emptyCart();
    window.location.reload();
  }


  public onSubmitPedido(f: NgForm): void {

  }
}