import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrito } from '@models/itemCarrito.interface';
import { CarritoService } from '@services/carrito/carrito.service';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public query: string;

  public menuSearched: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private menuSvc: MenuService, private cartSvc: CarritoService) {
    this.activatedRoute.queryParams.subscribe((e)=>{
      this.query = e.query;
      this.menuSvc.search(this.query,e.filter).subscribe( e => this.menuSearched = e)
    })
  }

  public addItemCart(food: any, e: Event): void {
    e.preventDefault();
    let { _id, denominacion, tiempoEstimado, precioVenta, img } = food;
    let cartItem: ItemCarrito = {_id, denominacion, tiempoEstimado, precioVenta, img, cantidad: 1};
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }

  ngOnInit(): void {}

}
