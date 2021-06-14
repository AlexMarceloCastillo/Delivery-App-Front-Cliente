import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@services/menu/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input() public search: string = '';

  public foodCheck: boolean = false;

  public drinkCheck: boolean = false;

  public filter: string;

  public filterList: any = {
    drinkfood: ()=>{
      console.log('AMBOS')
      this.foodCheck = false;
      this.drinkCheck = false;
    },
    drink: ()=>{
      console.log('BEBIDA')
      this.foodCheck = false;
      this.drinkCheck = true;
    },
    food: ()=>{
      console.log('COMIDA ')
      this.foodCheck = true;
      this.drinkCheck = false;
    }
  }

  public categoryFood: any = ['TODO','PIZZA','HAMBURGUESA','PAPAS','PANCHOS']
  public noAlcoholDrink: any = ['GASEOSA','JUGO']
  public alcoholDrink: any =['VINO','CERVEZA']

  public datalist$: Observable<any[]>;

  constructor(private menuSvc: MenuService, private router: Router) { }

  ngOnInit(): void {
  }

  public searchQuery(){
    this.router.navigate(['search'],{queryParams: {query: this.search.trim()}})
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
  public viewDetail(id: string){
    console.log(id)
  }

  public filterChange(e: Event){
    console.log(this.filter,e)
    this.filterList[this.filter]()
  }

}
