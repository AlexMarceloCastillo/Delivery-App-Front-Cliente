import { Component, OnInit } from '@angular/core';

import { CarritoService } from '@services/carrito/carrito.service';
import { Observable } from 'rxjs';
import { MenuService } from '@services/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public search: string = '';
  public menu$: Observable<any[]>;
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

  constructor(private cartSvc: CarritoService, private menuSvc: MenuService, private router: Router) { }


  ngOnInit(): void {
    this.menu$ = this.menuSvc.getAllMenu();
  }

  public searchQuery(){
    this.router.navigate(['search'],{queryParams: {query: this.search.trim()}})
  }
  public searchIcon(query:string){
    this.router.navigate(['search'],{queryParams:{query: query}})
  }
}
