import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PedidoService } from '@services/pedido/pedido.service';

import { Pedido } from '@models/pedido.interface';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public tiempo: any = { 
    calc: 0,
    hora: ""
  };

  constructor(private route: ActivatedRoute, private pedidoSvc: PedidoService) { }


  ngOnInit(): void {
    // this.convertidor();
    let pid = this.route.snapshot.paramMap.get('pid');
    this.pedidoSvc.getOnePedido(pid).subscribe( pedido => {
      this.tiempo.calc = pedido.horaEstimadaFin;
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
}
