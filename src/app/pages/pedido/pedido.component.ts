import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  public tiempo: any = { 
    calc: 65,
    hora: ""
  };

  constructor() { }

  ngOnInit(): void {
    this.convertidor();
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
