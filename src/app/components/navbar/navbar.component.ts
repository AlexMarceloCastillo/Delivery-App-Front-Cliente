import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from '@services/carrito/carrito.service';

import { Cliente } from '@models/cliente.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public cliente: Cliente;
  private clienteSuscription: Subscription;

  public cartLength: number = 0;
  private cartSuscription: Subscription;

  public r:boolean = false;
  public isOpen: boolean = true;

  constructor(private authSvc: AuthService, private cartSvc: CarritoService) { }


  ngOnInit(): void {
    this.clienteSuscription = this.authSvc.getDataClient().subscribe( (data) => this.cliente = data);
    this.cartSuscription = this.cartSvc.cart$.subscribe( cart => {
        this.cartLength = cart.reduce((sum,current)=> sum + current.cantidad,0);
    }, error =>  console.error(error) );
    this.isOpen = this.authSvc.openDelivery;
  }

  ngOnDestroy(): void {
    this.clienteSuscription.unsubscribe();
    this.cartSuscription.unsubscribe();
  }


  public onLogout(e: Event): void {
    e.preventDefault();
    this.cartSvc.emptyCart();
    this.authSvc.logOut();
  }
}
