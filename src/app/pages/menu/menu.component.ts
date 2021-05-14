import { Component, OnInit } from '@angular/core';

import { CarritoService } from '@services/carrito/carrito.service';
import { ArtmanufactService } from '@services/artManufact/artmanufact.service';

import { ItemCarrito } from '@models/itemCarrito.interface';
import { ArtManufacturado } from "@models/artManufact.interface";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public artManufact$: Observable<ArtManufacturado[]>;
  public categories: any[] = [
    {
      imgPath: "../../../assets/img/web/menu/pizza-slice.png",
      name: "Pizza"
    },
    {
      imgPath: "../../../assets/img/web/menu/burger.png",
      name: "Hamburguesas"
    },
    {
      imgPath: "../../../assets/img/web/menu/fried-potatoes.png",
      name: "Papas"
    },
    {
      imgPath: "../../../assets/img/web/menu/beer.png",
      name: "Bebidas"
    },
  ];

  constructor(private cartSvc: CarritoService, private artManufactSvc: ArtmanufactService) { }


  ngOnInit(): void {
    this.artManufact$ = this.artManufactSvc.getAll();
  }
}
