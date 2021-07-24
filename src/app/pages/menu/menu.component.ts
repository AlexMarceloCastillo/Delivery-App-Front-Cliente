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

  public isLast = false;
  public isFirst = true;
  public page = 0;
  public limit = 5;


  constructor(private menuSvc: MenuService, private router: Router) { }


  ngOnInit(): void {
    this.getData()
  }


  public getData(){
    this.menu$ = this.menuSvc.getAllMenu(this.limit,this.page);
    this.menu$.subscribe((e:any) => {this.isLast = e.isLast; this.isFirst = e.isFirst});
  }

  public searchQuery(){
    this.router.navigate(['search'],{queryParams: {query: this.search.trim()}})
  }
  public searchIcon(query:string){
    this.router.navigate(['search'],{queryParams:{query: query}})
  }

  next(){
    this.page += this.limit;
    this.getData()
  }
  previous(){
    this.page -= this.limit;
    this.getData()
  }
}
