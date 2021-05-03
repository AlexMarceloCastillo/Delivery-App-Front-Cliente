import { Component } from '@angular/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent{

  public cardsInfo: any = [
    {
      title: "Busca",
      subTitle: "Seleciona de nuestro menú tus comidas favoritas",
      imgPath: "../../../assets/img/web/order-food.png",
      alt: "Busca comida"
    },
    {
      title: "Ordena",
      subTitle: "Compra mediante MercadoPago o paga en el Local",
      imgPath: "../../../assets/img/web/tracking.png",
      alt: "Ordenar comida"
    },
    {
      title: "Entrega",
      subTitle: "Recive el pedido en tu casa",
      imgPath: "../../../assets/img/web/food-delivery.png",
      alt: "Entregar comida"
    }
  ];

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
