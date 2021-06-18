import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { RubGralService } from '@services/rubGral/rub-gral.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {


  @ViewChild('btnClose') btnClose : ElementRef;
  @Input() public search: string = '';

  public foodCheck: boolean = false;

  public drinkCheck: boolean = false;

  public filter: string = 'drinkfood';

  public category: string ='';

  public filterList: any = {
    drinkfood: ()=>{
      this.foodCheck = false;
      this.drinkCheck = false;
      this.category = '';
    },
    drink: ()=>{
      this.foodCheck = false;
      this.drinkCheck = true;
      this.category = 'BEBIDA'
    },
    food: ()=>{
      this.foodCheck = true;
      this.drinkCheck = false;
      this.category = 'COMIDA'
    }
  }

  public categoryFood$: Observable<any>;
  public noAlcoholDrink: any = [{id:"60bc3aa0cabb522214ef4d6a",denominacion: 'Gaseosa'}];
  public alcoholDrink: any =[{id:"60bc3aa0cabb522214ef4d6b",denominacion: 'Cerveza'}];

  public datalist$: Observable<any[]>;

  constructor(private menuSvc: MenuService, private router: Router, private rubGralSvc: RubGralService) { }

  ngOnInit(): void {
    this.categoryFood$ = this.rubGralSvc.getAllRubroGnral()
  }

  public searchQuery(){
    this.router.navigate(['search'],{queryParams: {query: this.search.trim(),filter: this.category}})
  }
  public searchFilter(){
    this.btnClose.nativeElement.click()
    this.category != '' ? this.router.navigate(['search'],{queryParams: {query: this.search.trim(),filter: this.category}})
    : this.router.navigate(['menu'])
  }
  public searchChange(e: Event){
    if(this.search.trim() == ''){
      this.cleanSearch()
    }else{
      this.datalist$ = this.menuSvc.search(this.search.trim())
    }
  }
  public cleanSearch(){
    this.search = '';
    this.datalist$ = new Observable<any[]>()
  }

  public filterChange(e: Event){
    console.log(this.filter,e)
    this.filterList[this.filter]()
  }



}
