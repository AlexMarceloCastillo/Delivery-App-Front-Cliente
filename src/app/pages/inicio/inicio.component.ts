import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OlmapComponent } from '@components/openlayer/olmap/olmap.component';
import { OlmarkerComponent } from '@components/openlayer/olmarker/olmarker.component';
import { Overlay } from 'ol';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit{

  @ViewChild(OlmapComponent,{static: false}) mapComp: OlmapComponent;
  @ViewChild(OlmarkerComponent,{static: false}) markerComp: OlmarkerComponent;

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

  constructor(private httpClient: HttpClient) {
    if(window.innerWidth < 995){
      this.zoom = 13;
    }else {
      this.zoom = 14
    }
  }

  ngAfterViewInit(): void {
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const overlay = new Overlay({
      element: container
    });
    this.httpClient.get('https://nominatim.openstreetmap.org/reverse?format=json&lat='+this.mapComp.lat+'&lon='+this.mapComp.lon)
    .subscribe((e:any)=>{
      content.innerHTML = '<div class="alert alert-warning" role="alert" style="border-radius:2.5%;width:50%;color:black">'+
      e.address.shop+' '+e.address.house_number+', '+e.address.road+', '+e.address.county+
      '</div>'
    })

    let coords = this.markerComp.marker.getProperties();
    overlay.setPosition([coords.geometry.flatCoordinates[0],coords.geometry.flatCoordinates[1]]);
    this.mapComp.map.addOverlay(overlay)
  }
}
