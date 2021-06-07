import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from '@services/carrito/carrito.service';
import { ArtmanufactService } from '@services/artManufact/artmanufact.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { ArtManufacturado } from "@models/artManufact.interface";


@Component({
  selector: 'app-comida-detalle',
  templateUrl: './comida-detalle.component.html',
  styleUrls: ['./comida-detalle.component.scss']
})
export class ComidaDetalleComponent implements OnInit {
  public btnDisabled: boolean = true;
  public food: ArtManufacturado;
  public tiempoEstimado: string;


  constructor(private cartSvc: CarritoService, private auth: AuthService, private artManufactSvc: ArtmanufactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.auth.isAuth) {
      this.btnDisabled = false;
    }
    let artManufact_id = this.route.snapshot.paramMap.get('id');
    this.artManufactSvc.getOne(artManufact_id).subscribe( data => { 
      this.food = data;
      this.calcTiempo(data.tiempoEstimado);
    }, error => console.error(error));
  }


  public addItemCart(food: any, e: Event): void {
    e.preventDefault();
    let { _id, denominacion, tiempoEstimado, precioVenta, img } = food;
    let cartItem: ItemCarrito = {_id, denominacion, tiempoEstimado, precioVenta, img, cantidad: 1};
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }


  private calcTiempo(tiempo) {
    let num = tiempo;

    let hours = (num / 60);
    let rhours = Math.floor(hours);

    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    if(rhours >= 1){
      this.tiempoEstimado = `${rhours} hora(s) ${rminutes} minuto(s)`;
    } else {
      this.tiempoEstimado = `${rminutes} minuto(s)`
    }
  }
}
