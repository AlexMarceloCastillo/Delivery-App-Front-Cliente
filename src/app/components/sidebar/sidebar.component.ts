import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from '@services/carrito/carrito.service';

import { Cliente } from '@models/cliente.interface';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public cliente: Cliente;
  private clienteSuscription: Subscription;


  constructor (private authSvc: AuthService, private cartSvc: CarritoService) { }

  
  ngOnInit(): void { 
    this.clienteSuscription = this.authSvc.getDataClient().subscribe( 
      data => this.cliente = data, 
      error => console.error(error) 
    );
  }

  ngOnDestroy(): void {
    this.clienteSuscription.unsubscribe();
  }


  public onLogout(): void {
    this.cartSvc.emptyCart();
    this.authSvc.logOut();
  }
}
