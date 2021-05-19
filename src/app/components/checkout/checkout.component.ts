import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from "@services/carrito/carrito.service";
import { FormDataBuildService } from '@shared/services/form-data-build.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { Domicilio } from '@models/domicilio.interface';

// import { OlmapComponent } from 'src/app/olmaps/olmap/olmap.component';

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

  public stepp: number = 0;
  public mostrar = false;
  public domicilioForm: FormGroup;
  public guaymallen = guaymallen;


  public retiroLocal: boolean = true;

  public parentDomicilioForm: FormGroup;


  constructor( private carritoSvc:CarritoService, private auth: AuthService, private formDataBuildSvc: FormDataBuildService ) { }


  ngOnInit(): void {
    this.cartSuscription = this.carritoSvc.cart$.subscribe( cart => { 
      this.itemsCart = cart;
      this.subTotal = cart.reduce( (sum, current) => sum + (current.precioVenta*current.cantidad),0);
    }, error => console.error(error) );
    this.auth.getDataClient().subscribe( user => {
      console.log(user.domicilio);
      this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
    }, error => console.error(error));
  }

  ngOnDestroy(): void {
    this.cartSuscription.unsubscribe();
  }

  public next(e: Event): void {
    e.preventDefault();
    this.stepp+=1;
  }
  public back(e: Event): void {
    e.preventDefault();
    this.stepp-=1;
  }

  public deleteCart(e:Event): void {
    e.preventDefault();
    this.carritoSvc.emptyCart();
    location.reload();
  }
}