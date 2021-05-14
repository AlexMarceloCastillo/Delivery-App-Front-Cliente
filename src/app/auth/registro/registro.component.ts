import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import guaymallen from '@assets/json/guaymallen.json';
import { Domicilio } from '@models/domicilio.interface';
import { OlmapComponent } from 'src/app/olmaps/olmap/olmap.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent{
  //Modal
  @ViewChild('btnClose') btnClose : ElementRef;
  @ViewChild('btnCloseComplete') btnCloseComplete : ElementRef;
  //Mapa
  @ViewChild(OlmapComponent,{static: false}) mapComp: OlmapComponent;
  public mostrar = false;
  public userForm: FormGroup;
  public domicilioForm: FormGroup;
  public guaymallen = guaymallen;

  private latHome = null;
  private lonHome = null;
  private domicilio: Domicilio;

  public retiroLocal: boolean = true;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService, private httpClient: HttpClient,private toast: ToastrService) {
    this.buildRegisterForm();
    this.buildDomicilioForm();
  }

  public handleCheckChange(e: any): void {
    if (e.currentTarget.checked) {
      this.retiroLocal = true;
    } else {
      this.retiroLocal = false;
    }
  }


  private buildRegisterForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(16)]], //password
      username: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      telefono: ['',[Validators.required]]
    });
  }

  private buildDomicilioForm(): void {
    this.domicilioForm = this.formBuilder.group({
      calle: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      numero:[0,[Validators.required,Validators.min(1)]],
      localidad: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
    });
  }


  onSaveRegister(e: Event): void {
    e.preventDefault();
    if(this.userForm.valid) {
      if(!this.retiroLocal) {
        let { calle, numero, localidad } = this.domicilioForm.value;
        this.domicilio = {
          calle,
          numero,
          localidad,
          latitud: this.latHome,
          longitud: this.lonHome
        };
      } else {
        this.domicilio = null;
      }
      this.authSvc.register(this.userForm.value,this.domicilio)
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public GoogleRegister(): void{
    this.authSvc.loginGoogle();
  }

  //Funciones de el mapa

  public mostrarMapa(){
    setTimeout(()=>{
      this.mostrar = true;
    },100)
  }

  public cleanMap(){
    if(this.mapComp.map.getLayers().getLength() == 4){
      this.mapComp.map.getLayers().removeAt(3);
      this.mapComp.userCoords = null;
      this.latHome = 0;
      this.lonHome = 0;
      this.domicilioForm.reset()
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
      this.latHome = coords[1]
      this.lonHome = coords[0]
      this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}`)
      .subscribe((data:any)=>{
        let exists: boolean = false;
        let display = data.display_name.split(',')
        for(let i = 0;i < display.length; i++){
          if(display[i].includes('Distrito')){
            let localidad = display[i].trim().substr(8,display[i].length)
            this.guaymallen.forEach((e)=>{
              if(e.denominacion.includes(localidad.trim())){
                this.domicilioForm.get('localidad').setValue(localidad.trim())
                this.domicilioForm.get('calle').setValue(data.address.road);
                exists = true
              }
            })
          }
        }
        if(exists){
          this.btnCloseComplete.nativeElement.click()
          this.toast.success('Distrito disponible, porfavor agrege el numero de su calle','',{
            timeOut: 4000,
            positionClass: 'toast-top-center'
          })
        }else{
          this.toast.error('Su distrito no se encuentra disponible para el delivery','',{
            timeOut: 4000,
            positionClass: 'toast-top-center'
          })
          this.domicilioForm.reset()
          this.retiroLocal = true;
          this.btnClose.nativeElement.click()
        }
      })
    }
  }


  // Solo para mostrar errores
  public get email(): any {
    return this.userForm.get('email');
  }
  public get pwd(): any {
    return this.userForm.get('pwd');
  }
  public get username(): any {
    return this.userForm.get('username');
  }
  public get telefono(): any {
    return this.userForm.get('telefono');
  }
  public get calle(): any {
    return this.domicilioForm.get('calle');
  }
  public get numero(): any {
    return this.domicilioForm.get('numero');
  }
  public get localidad(): any {
    return this.domicilioForm.get('localidad');
  }
}
