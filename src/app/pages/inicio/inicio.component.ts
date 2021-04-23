import { Component } from '@angular/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent{
  scrHeight:any;
  scrWidth:any;
  zoom:number = 14;

  constructor() {
    if(window.innerWidth < 995){
      this.zoom = 13;
    }else {
      this.zoom = 14
    }
  }



}
