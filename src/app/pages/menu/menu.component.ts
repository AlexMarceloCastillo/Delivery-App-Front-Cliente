import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MenuService } from '@services/menu/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public search: string = '';
  public menu$: Observable<any[]>;


  constructor(private menuSvc: MenuService, private router: Router) { }


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
