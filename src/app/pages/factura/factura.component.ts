import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Cliente } from '@models/cliente.interface';
import { Pedido } from '@models/pedido.interface';
import { ArtInsumoService } from '@services/artInsumo/art-insumo.service';
import { ArtmanufactService } from '@services/artManufact/artmanufact.service';
import { FacturaService } from '@services/factura/factura.service';
import { PedidoService } from '@services/pedido/pedido.service';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  
  @ViewChild('factura') htmlData:ElementRef | any;
  public cliente: Cliente;
  public factura: Observable<any>;
  public pedido: Pedido;
  public facturaNro: number = 0;
  public articulos: any[] = [];
  public fecha: string = "";
  constructor(private pedidoSvc: PedidoService,
    private facturaSvc: FacturaService,
    private route: ActivatedRoute,
    private artManuSvc: ArtmanufactService,
    private artInSvc: ArtInsumoService,
    private authSvc: AuthService) {

    this.authSvc.getDataClient().subscribe(e => this.cliente = e)
    this.pedidoSvc.getOne(this.route.snapshot.paramMap.get('pid')).subscribe((pedido: Pedido) => {
      this.pedido = pedido;
      this.facturaNro = Math.floor(Math.random()*1000000);
      let auxFecha = new Date(pedido.accepted)
      this.fecha = auxFecha.getDate() + "/"+(auxFecha.getMonth()+1)+"/"+auxFecha.getFullYear()
      this.pedido.DetallePedido.forEach(e => {
        if(e.ArtManufact){
          this.artManuSvc.getOne(e.ArtManufact).subscribe( artManu => this.articulos.push({denominacion:artManu.denominacion,cantidad:e.cantidad,subTotal:e.subTotal}))
        }
        if(e.ArticuloInsumo){
          this.artInSvc.getOne(e.ArticuloInsumo).subscribe( artIn => this.articulos.push({denominacion: artIn.denominacion,cantidad:e.cantidad,subTotal:e.subTotal}))
        }
      })
      this.factura = this.facturaSvc.getOne(pedido.Factura)
    })
  }

  ngOnInit(): void {
  }

  public downloadPdf(){
    var doc = new jsPDF();
    doc.addImage("../../../assets/img/web/Delibery The Good Taste.png", "JPEG", 26.25, 0, 25, 25);
    doc.setFontSize(12);
    doc.text("Delivery", 5, 30);
    doc.text("2615179908", 5, 35);
    doc.text("Plaza Shopping 3280, Acceso Este Lateral Norte", 5, 40);
    doc.text(", Departamento Guaymallén", 5, 45);
    //INFO FACTURA
    doc.setFontSize(16);
    doc.text(`NRO* ${this.facturaNro}`,145,5);
    doc.setFontSize(24);
    doc.text(`FECHA: ${this.fecha}`,120,15);
    doc.setFontSize(12);
    doc.text("CUIT NRO*: 20-4328230-3",135,25);
    doc.text("INGRESOS BRUTOS: 123123-D5",125,30);
    doc.line(0, 50, 210, 50); // horizontal line
    doc.line(100, 0, 100, 10); // vertical line
    doc.line(100, 25, 100,50); // vertical line
    //TIPO C
    doc.rect(92, 10, 15, 15);
    doc.setFontSize(28)
    doc.text('C',96,22)
    //ASOCIACION
    doc.setFontSize(14)
    doc.text(`SEÑOR(ES):${this.cliente.nombre}`,5,60)
    doc.text(`DOMICILIO:${this.pedido.Cliente.Domicilio.calle}`,5,70)
    doc.text('LOCALIDAD: GUAYMALLEN',5,80)
    doc.line(0, 85,210,85)
    //IVA
    doc.setFontSize(14)
    doc.text('IVA:',5,95)
    doc.line(0, 100,210,100)
    doc.setFontSize(10)
    doc.setFillColor(0, 0, 0);
    doc.circle(25, 92.5, 2.5, "FD");
    doc.text('CONSUMIDOR FINAL',30,94)

    doc.setFillColor(255, 255, 255);
    doc.circle(75, 92.5, 2.5, "FD");
    doc.text('MONOTRIBUTO',80,94)

    doc.setFillColor(255, 255, 255);
    doc.circle(115, 92.5, 2.5, "FD");
    doc.text('EXTENTO',120,94)

    doc.setFillColor(255, 255, 255);
    doc.circle(145, 92.5, 2.5, "FD");
    doc.text('RESPONSABLE INSCRIPTO',150,94)

    //CONDICIONES VENTA
    doc.setFontSize(14)
    doc.text('CONDICIONES DE VENTA:',5,110)
    doc.line(0, 115,210,115)

    doc.setFontSize(10)
    var colorContado = 255;
    var colorCtaCte = 255;
    if(this.pedido.tipoEnvio == 1){
      colorCtaCte = 0;
    }else{
      colorContado = 0;
    }
    doc.setFillColor(colorContado, colorContado, colorContado);
    doc.circle(95, 107.5, 2.5, "FD");
    doc.text('CONTADO',100,109)

    doc.setFillColor(colorCtaCte, colorCtaCte, colorCtaCte);
    doc.circle(145, 107.5, 2.5, "FD");
    doc.text('CUENTA CORRIENTE',150,109)
    //TABLA
   doc.setFontSize(20)
   doc.rect(0, 115, 25, 15);
   doc.text('CANT',2.5,125)
   doc.rect(25, 115,100, 15);
   doc.text('DETALLE',62.5,125)
   doc.rect(125, 115, 55, 15);
   doc.text('PRECIO UNIT',128,125)
   doc.rect(180, 115, 30, 15);
   doc.text('TOTAL',182,125)
   let acum = 130;
   let acumData = 140;
   doc.setFontSize(18)
   this.articulos.forEach((e:any) =>{
     doc.rect(0,acum,25,15)
     doc.rect(25,acum,100,15)
     doc.rect(125,acum,55,15)
     doc.rect(180,acum,30, 15)
     doc.text(`${e.cantidad}`,10,acumData)
     doc.text(`${e.denominacion}`,30,acumData)
     doc.text(`${e.subTotal/e.cantidad}$`,128,acumData)
     doc.text(`${e.subTotal}$`,182,acumData)
     acum +=15;
    acumData += 15;
   })
   //GENERAR ESPACIOS EN BLANCO
   for(let i = 0;i < 9 - this.articulos.length;i++){
     doc.rect(0,acum,25,15)
     doc.rect(25,acum,100,15)
     doc.rect(125,acum,55,15)
     doc.rect(180,acum,30, 15)
     doc.text(``,10,acumData)
     doc.text(``,30,acumData)
     doc.text(``,128,acumData)
     doc.text(``,182,acumData)
     acum +=15;
    acumData += 15;
   }
   doc.setFontSize(12)
   doc.rect(0,265,180,15)
   doc.rect(180,265,30,15)
   doc.text('ORIGINAL para el CLIENTE, DUPLICADO para el EMISOR',5,275)
   doc.text('TOTAL:',155,275)
   doc.text(`${this.pedido.total}$`,185,275)
   doc.text(`FECHA DE IMPRESION: ${this.fecha}`,5,290)
   doc.save(`factura${this.pedido._id}.pdf`)
  }

}
