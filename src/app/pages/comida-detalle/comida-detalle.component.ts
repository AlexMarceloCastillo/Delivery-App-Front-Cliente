import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import { CarritoService } from '@services/carrito/carrito.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { MenuService } from '@services/menu/menu.service';
import { RubartService } from '@services/rubroArticulo/rubart.service';


@Component({
  selector: 'app-comida-detalle',
  templateUrl: './comida-detalle.component.html',
  styleUrls: ['./comida-detalle.component.scss']
})
export class ComidaDetalleComponent implements OnInit {
  public btnDisabled: boolean = true;
  public tipoArt = "";
  public food: any;
  public tiempoEstimado: string;
  public rubArt: any;


  constructor(
    private cartSvc: CarritoService, private auth: AuthService, private menuSvc: MenuService,
    private rubArtSvc: RubartService, private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.auth.isAuth().subscribe(data => {
      if(data) this.btnDisabled = false;
    }, error => console.error(error));

    let menuId = this.route.snapshot.paramMap.get('id');

    this.menuSvc.getOneMenu(menuId).subscribe( item => {
      this.tipoArt = item.tipo;
      this.food = item.data;
      
      this.calcTiempo(item.data.tiempoEstimado);

      if(this.tipoArt==='artInsumo') {
        this.rubArtSvc.getOne(item.data.RubArt._id).subscribe( data => {
          this.rubArt = data[0];
        }, error => console.error(error) );
      }
    }, error => console.error(error));
  }


  public addItemCart(food: any, e: Event): void {
    e.preventDefault();
    let { _id, denominacion, tiempoEstimado, precioVenta, img } = food;
    let cartItem: ItemCarrito = {_id, denominacion, tiempoEstimado, precioVenta, img, cantidad: 1};
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }


  private calcTiempo(tiempo: number) {
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
