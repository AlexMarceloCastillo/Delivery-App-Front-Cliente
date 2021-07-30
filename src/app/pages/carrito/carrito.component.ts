import { Component, OnInit, DoCheck} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from "@services/carrito/carrito.service";
import { FormDataBuildService } from '@shared/services/form-data-build.service';
import { PedidoService } from '@services/pedido/pedido.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { Pedido } from '@models/pedido.interface';
import { MdopagoService } from '@services/mdopago/mdopago.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  public itemsCart: ItemCarrito[];
  public cliente: any;

  // <Form>
  public subTotal:number;
  // </Form>

  public parentDomicilioForm: FormGroup;
  public sumaryForm: FormGroup;


  constructor(
    private carritoSvc:CarritoService, private auth: AuthService,
    private formDataBuildSvc: FormDataBuildService, private formBuilder: FormBuilder,
    private pedidoSvc: PedidoService, private router: Router,
    private mdopagoSvc: MdopagoService
  ) { }


  ngOnInit(): void {

    this.carritoSvc.cart$.subscribe( cart => {
      this.itemsCart = cart;
      this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);

      this.formBuildandUpdate();
    }, error => { this.subTotal = 0; console.error(error); });

  }


  /**
   * Crea y actualiza los formularios de domicilio y checkout simpre y cuando este logueado
   */
  private formBuildandUpdate(){
    this.auth.isAuth().subscribe( data => {
      if(data) {
        this.auth.getDataClient().subscribe( user => {
          if(user){
            this.cliente = user;
            this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
            this.buildSuamryForm();

            this.parentDomicilioForm.get('local').valueChanges.subscribe( value => {
              this.updateSumaryForm(value);
            }, error => console.error(error));
          }
        }, error => console.error(error) );
      }
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
  }

  /**
   * Actualiza el formulario del checkout
   * @param local
   */
  private updateSumaryForm(local: boolean): void {
    let desc: number = 0;
    let total:number = this.subTotal;
    if(local){
      desc = this.subTotal*0.10;
      total = this.subTotal-desc;
    }
    this.sumaryForm.patchValue({desc , total, subTotal: this.subTotal });
  }

  /**
   * Construye el formulario de checkout
   */
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


  /**
   * Parseo y envio de los datos del formulario al backend
   * @param event 
   */
  public onSubmitPedido(e: Event): void {
    e.preventDefault();
    let horaEstimadaFin = this.itemsCart.reduce((sum,item)=> item.tiempoEstimado ? sum + (item.tiempoEstimado)*item.cantidad : 0,0);
    let itemsPedido: any = [];
    let descripcion: any = [];
    this.itemsCart.forEach( item => {
      descripcion.push(item.denominacion)
      let aux = item.tiempoEstimado ? {
        cantidad: item.cantidad,
        subTotal: item.cantidad*item.precioVenta,
        ArtManufact: { _id: item._id}
      } : {
        cantidad: item.cantidad,
        subTotal: item.cantidad*item.precioVenta,
        ArticuloInsumo: {_id: item._id}
      };
      itemsPedido.push(aux);
    });
    let pedido: Pedido = {
      Cliente: {
        firebase_id: this.cliente.uid,
        Domicilio: this.parentDomicilioForm.value
      },
      horaEstimadaFin: this.parentDomicilioForm.value.local ? horaEstimadaFin : horaEstimadaFin +10,
      estado: 'en espera',
      total: this.sumaryForm.value.total ,
      fecha: new Date(),
      tipoEnvio: this.parentDomicilioForm.value.local? 0 : 1,
      DetallePedido: itemsPedido,
      Factura: null,
      canceled: null
    }
    this.pedidoSvc.post(pedido).toPromise()
    .then(data => {
      if(pedido.tipoEnvio == 1){
        let checkout = {
          uidPedido: data._id,
          uidUsuario: this.cliente.uid,
          titulo: 'Good State Pedido',
          descripcion: descripcion.toString(),
          precioTotal: data.total
        }
        this.mdopagoSvc.createCheckout(checkout).subscribe(link => {
         window.location.assign(link)
        })
      }else {
        this.router.navigate([this.cliente.uid, 'pedidos', data._id]);
      }
      this.carritoSvc.emptyCart();
    })
    .catch(e=>console.error(e));
   }
}
