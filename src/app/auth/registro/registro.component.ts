import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import guaymallen from '@assets/json/guaymallen.json';
import { Domicilio } from '@models/domicilio.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public userForm: FormGroup;
  public domicilioForm: FormGroup;
  public guaymallen = guaymallen;

  private latHome = null;
  private lonHome = null;
  private domicilio: Domicilio;
  private uid: string;

  public retiroLocal: boolean = true;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService, private httpClient: HttpClient) {
    this.buildRegisterForm();
    this.buildDomicilioForm();
  }

  ngOnInit(): void { }

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

  private setLatLon(){
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    let location: any;
    navigator.geolocation.getCurrentPosition((pos)=>{
      let { latitude, longitude } = pos.coords;
      this.latHome = latitude;
      this.lonHome = longitude;
      this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .subscribe(e =>{
        location = e;
        var display = location.display_name.split(',')
        for(let i = 0;i < display.length; i++){
          if(display[i].includes('Distrito')){
            var localidad = display[i].trim().substr(8,display[i].length)
            this.guaymallen.forEach((e)=>{
              if(e.denominacion.includes(localidad.trim())){
                this.domicilioForm.get('localidad').setValue(localidad.trim())
              }
            })
          }
        }
        if(this.domicilioForm.get('localidad').value == ""){
          this.authSvc.toastrSvc.error('Su distrito no esta disponible para el delivery, solo retiro en el local',
          'Por favor seleccione la opcion de retiro en el local',{
            positionClass: 'toast-bottom-right',
            timeOut: 5500
          })
        }
        this.domicilioForm.get('calle').setValue(location.address.road);
      })
    }, err => console.error('ERROR(' + err.code + '): ' + err.message), options);
  }

  public GoogleRegister(): void{
    this.authSvc.loginGoogle();
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