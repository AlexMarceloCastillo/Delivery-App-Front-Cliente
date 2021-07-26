import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PedidoService } from '@services/pedido/pedido.service';

import { Pedido } from '@models/pedido.interface';
import { MdopagoService } from '@services/mdopago/mdopago.service';
import { ArtmanufactService } from '@services/artManufact/artmanufact.service';
import { ArtInsumoService } from '@services/artInsumo/art-insumo.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public pedido: Pedido;
  public articulos: any[] = [];
  public statusClass: string = '';
  public subTotal: number = 0;
  public statusInfo: string;
  public fecha: string = "";
  public text: string = "text-white"
  public icon: string;
  public tiempo: any = {
    calc: 0,
    hora: ""
  };


  constructor(
    private route: ActivatedRoute,
    private pedidoSvc: PedidoService,
    private mdoSvc: MdopagoService,
    private artManuSvc: ArtmanufactService,
    private artInSvc: ArtInsumoService
  ) { }


  ngOnInit(): void {
    this.convertidor();
    let pid = this.route.snapshot.paramMap.get('pid');

    this.pedidoSvc.getOne(pid).subscribe( pedido => {
      this.pedido = pedido;
      let auxFecha = new Date( pedido.fecha );
      this.fecha = auxFecha.getDate() + "/"+(auxFecha.getMonth()+1)+"/"+auxFecha.getFullYear();
      this.pedido.DetallePedido.forEach( e => {
        this.subTotal += e.subTotal;
        if(e.ArtManufact){
          this.artManuSvc.getOne(e.ArtManufact).subscribe( artManu => this.articulos.push({artManu,cantidad:e.cantidad,subTotal:e.subTotal}))
        }
        if(e.ArticuloInsumo){
          this.artInSvc.getOne(e.ArticuloInsumo).subscribe( artIn => this.articulos.push({artIn,cantidad:e.cantidad,subTotal:e.subTotal}))
        }
      });
      this.tiempo.calc = pedido.horaEstimadaFin;
      if(pedido.tipoEnvio == 1 && pedido.estado == 'en espera'){
        this.mdoSvc.getPagoStatus(pedido._id).subscribe(e => {
          if(e.estado == 'failure' && !this.pedido.canceled) {
            this.pedidoSvc.cancelPedido(this.pedido._id,{motivo:'Error el pago ha sido rechazado por Mercado Pago'})
          }
        }, error => console.error(error));
      }
      this.changeStatePedido(pedido.estado);
      this.convertidor();
    }, error => console.error(error));
  }


  /**
  * Convierte un valor numerico en un formato de hora.
  * https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php#:~:text=JavaScript%20Code%3A,log(timeConvert(200))%3B
  */
  public convertidor(): void {
    let num = this.tiempo.calc;

    let hours = (num / 60);
    let rhours = Math.floor(hours);

    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    if(rhours >= 1){
      this.tiempo.hora = `${rhours} hora(s) ${rminutes} minuto(s)`;
    } else {
      this.tiempo.hora = `${rminutes} minuto(s)`
    }
  }

  private changeStatePedido(estado: string) {
    switch (estado) {
      case 'en espera':
        this.statusClass = 'bg-warning';
        this.statusInfo = 'Su pedido esta en espera de aprobacion, suele tardar no mas de 2 minutos.';
        this.icon = "fas fa-stopwatch";
        this.text = "text-dark";
      break;
      case 'en cocina':
        this.statusClass= "bg-info";
        this.statusInfo = 'En estos momentos uno de nuestros cocineros esta trabajando con su pedido.';
        this.icon = "far fa-clock";
        this.text = "text-dark";
      break;
      case 'listo':
        this.statusClass = "bg-success";
        this.statusInfo = 'Su pedido esta listo para retirar en el local!.';
        this.icon = "far fa-check-circle";
      break;
      case 'entregado':
        this.statusClass = "bg-success";
        this.statusInfo = 'Su pedido se ha entregado con exito.';
        this.icon = "fas fa-shipping-fast";
      break;
      case 'cancelado':
        this.statusClass = "bg-danger";
        this.statusInfo = 'Su pedido ha sido rechazado.';
        this.icon = "far fa-times-circle";
      break;
      case 'demorado':
        this.statusClass = "bg-warning";
        this.statusInfo = "Su pedido ha sido demorado 10 minutos mas. Sentimos el tiempo agregado , nuestro cocinero esta haciendo su pedido perfecto";
        this.icon = "far fa-clock";
        this.text = "text-dark";
      default:
      break;
    }
  }
}
