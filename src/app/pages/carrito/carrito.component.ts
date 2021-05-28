import { Component, OnInit, DoCheck} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from "@services/carrito/carrito.service";
import { FormDataBuildService } from '@shared/services/form-data-build.service';
import { PedidoService } from '@services/pedido/pedido.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { Pedido } from '@models/pedido.interface';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit, DoCheck {

  public itemsCart: ItemCarrito[];
  public sessionCart: ItemCarrito[];
  public cliente: any;

  // <Form>
  public subTotal:number;
  // </Form>

  public parentDomicilioForm: FormGroup;
  public sumaryForm: FormGroup;

  constructor( 
    private carritoSvc:CarritoService, private auth: AuthService, 
    private formDataBuildSvc: FormDataBuildService, private formBuilder: FormBuilder,
    private pedidoSvc: PedidoService, private router: Router
  ) { }

  ngOnInit(): void {
    this.carritoSvc.cart$.subscribe( cart => {
        this.itemsCart = cart;
        this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);
    }, error => { this.subTotal = 0, console.error(error) });
    this.sessionCart = JSON.parse(sessionStorage.getItem('cart'));

    this.auth.getDataClient().subscribe( user => {
      this.cliente = user;
      this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
      this.buildSuamryForm();

      this.parentDomicilioForm.get('local').valueChanges.subscribe( value => {
        this.updateSumaryForm(value);
      }, error => console.error(error));
    }, error => console.error(error) );
  }

  ngDoCheck(): void {
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

  private updateSumaryForm(local: boolean): void {
    let desc: number = 0;
    let total:number = this.subTotal;
    if(local){
      desc = this.subTotal*0.10;
      total = this.subTotal-desc;
    }
    this.sumaryForm.patchValue({desc , total, subTotal: this.subTotal });
  }

  private buildSuamryForm(): void {

    let descuento: number = 0;
    let total:number = this.subTotal;

    if(this.parentDomicilioForm.value.local){
      descuento = this.subTotal*0.10;
      total = this.subTotal-descuento;
    }

    this.sumaryForm = this.formBuilder.group({
      metodoPago: new FormControl({ value: true, disabled: true}, Validators.required),
      subTotal: new FormControl({value: this.subTotal, disabled: true}),
      desc: new FormControl({ value: descuento, disabled: true }),
      total: new FormControl({ value: total, disabled: true })
    });
  }

  public onSubmitPedido(e: Event): void {
    e.preventDefault();
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
        id: this.cliente.uid,
        Domicilio: this.parentDomicilioForm.value
      },
      horaEstimadaFin,
      estado: 'en espera',
      total: this.sumaryForm.value.subtotal,
      fecha: new Date(),
      tipoEnvio: this.parentDomicilioForm.value.local? 0 : 1,
      DetallePedido: itemsPedido
    }

    this.pedidoSvc.savePedido(pedido).toPromise()
      .then(data => {
        this.carritoSvc.emptyCart();
        this.router.navigate([this.cliente.uid, 'pedidos', data._id]);
      })
      .catch(e=>console.error(e));
  }
}