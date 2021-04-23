import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '@auth/auth.service';
import { TogglerService } from '@services/toggler/toggler.service';

import { Cliente } from '@models/cliente.interface';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  public cliente: Cliente;
  private clienteSuscription: Subscription;

  constructor(private togglerSvc: TogglerService, private routerSvc: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.routerSvc.events.subscribe( (value) =>{
      if (value instanceof NavigationEnd) {
        this.onToggle();
      } else {
        this.togglerSvc.toggle(false);
      }
    });
    this.clienteSuscription = this.authSvc.getDataClient().subscribe((data)=>this.cliente = data);
  }

  ngOnDestroy(): void {
    this.clienteSuscription.unsubscribe();
  }

  public get toggleStatus(): TogglerService {
    return this.togglerSvc;
  }

  public onToggle(): void{
    this.togglerSvc.toggle(!this.togglerSvc.statusSubject.getValue());
  }

  public onLogout(): void {
    this.authSvc.logOut();
  }
}
