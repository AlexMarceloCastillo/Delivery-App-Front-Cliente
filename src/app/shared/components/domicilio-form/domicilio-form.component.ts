import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { OlmapComponent } from 'src/app/olmaps/olmap/olmap.component';
import guaymallen from '@assets/json/guaymallen.json';


@Component({
  selector: 'shared-domicilio-form',
  templateUrl: './domicilio-form.component.html',
  styleUrls: ['./domicilio-form.component.scss']
})
export class DomicilioFormComponent implements OnInit, OnChanges {
  @Input() formParentDom: FormGroup;
  @Input() view: string = 'register';

  //Modal
  @ViewChild('btnClose') btnClose : ElementRef;
  @ViewChild('btnCloseComplete') btnCloseComplete : ElementRef;
  //Mapa
  @ViewChild(OlmapComponent,{static: false}) mapComp: OlmapComponent;

  public childDomicilioForm: FormGroup;

  public guaymallen = guaymallen;
  
  public mostrar: boolean = false;


  constructor( private httpClient: HttpClient, private toast: ToastrService ) { }


  ngOnChanges(): void {
    this.childDomicilioForm = this.formParentDom;
  }

  ngOnInit(): void {
  }


  /*    Funciones de el mapa    */

  public mostrarMapa(){
    setTimeout(()=>{
      this.mostrar = true;
    },100)
  }

  public cleanMap(){
    if(this.mapComp.map.getLayers().getLength() == 4){
      this.mapComp.map.getLayers().removeAt(3);
      this.mapComp.userCoords = null;
      this.childDomicilioForm.patchValue({ latitud:0, longitud:0});
      this.childDomicilioForm.reset()
    }
  }

  public saveCoords(){
    if(this.mapComp.userCoords == null){
      this.toast.error('Ningun punto seleccionado en el mapa','',{
        timeOut: 1000,
        positionClass: 'toast-top-center'
      })
    }else{
      let coords = this.mapComp.userCoords;

      this.childDomicilioForm.patchValue({ latitud:coords[1], longitud:coords[0]});

      this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}`)
      .subscribe( (data:any) => {
        let exists: boolean = false;
        let display = data.display_name.split(',')
        for(let i = 0;i < display.length; i++){
          if(display[i].includes('Distrito')){
            let localidad = display[i].trim().substr(8,display[i].length)
            this.guaymallen.forEach((e)=>{
              if(e.denominacion.includes(localidad.trim())){
                this.childDomicilioForm.get('localidad').setValue(localidad.trim())
                this.childDomicilioForm.get('calle').setValue(data.address.road);
                exists = true
              }
            })
          }
        }
        if( exists ) {
          this.btnCloseComplete.nativeElement.click()
          this.toast.success('Distrito disponible, porfavor agrege el numero de su calle','',{
            timeOut: 4000,
            positionClass: 'toast-top-center'
          });
        } else {
          this.toast.error('Su distrito no se encuentra disponible para el delivery','',{
            timeOut: 4000,
            positionClass: 'toast-top-center'
          });
          this.childDomicilioForm.reset();
          this.btnClose.nativeElement.click();
        }
      });
    }
  }

  // Solo para mostrar errores
  public get calle(): any {
    return this.childDomicilioForm.get('calle');
  }
  public get numero(): any {
    return this.childDomicilioForm.get('numero');
  }
  public get localidad(): any {
    return this.childDomicilioForm.get('localidad');
  }
}
