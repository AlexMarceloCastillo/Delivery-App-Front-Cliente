import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from "../services/auth.service";

import { HttpClient } from '@angular/common/http';

import guaymallen from '@assets/json/guaymallen.json';
import { Domicilio } from '@models/domicilio.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public registerForm: FormGroup;
  public guaymallen = guaymallen;
  private latHome = null;
  private lonHome = null;
  private domicilio: Domicilio;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService, private httpClient: HttpClient, private router: Router) {
    this.buildRegiserForm()
  }

  ngOnInit(): void {}

  private buildRegiserForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]], //password
      username: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      calle: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      numero:[0,[Validators.required,Validators.min(1),Validators.max(9999999)]],
      localidad: ["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]

    });
  }

  onSaveRegister(e: Event): void {
    e.preventDefault();
    if(this.registerForm.valid){
      const {email,pwd,username} = this.registerForm.value;
      this.domicilio = {
        calle: this.registerForm.get('calle').value,
        numero: this.registerForm.get('numero').value,
        localidad: this.registerForm.get('localidad').value      ,
        latitud: this.latHome,
        longitud: this.lonHome
      };
      this.authSvc.register(email,pwd,username,this.domicilio)
      this.registerForm.reset();
      this.router.navigate(['/verification'])
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  public setLatLon(){
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    let location: any;
    navigator.geolocation.getCurrentPosition((pos)=>{
      var crd = pos.coords;
      this.latHome = crd.latitude
      this.lonHome = crd.longitude
      this.httpClient.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+crd.latitude+"&lon="+crd.longitude)
      .subscribe(e =>{
        location = e;
        var display = location.display_name.split(',')
        for(let i = 0;i < display.length; i++){
          if(display[i].includes('Distrito')){
            var localidad = display[i].trim().substr(8,display[i].length)
            this.guaymallen.forEach((e)=>{
              if(e.denominacion.includes(localidad.trim())){
                this.registerForm.get('localidad').setValue(localidad.trim())
              }
            })
          }
        }
        if(this.registerForm.get('localidad').value == ""){
          this.authSvc.toastrSvc.error('Su distrito no esta disponible para el delivery, solo retiro en el local','',{
            positionClass: 'toast-center-center',
            timeOut: 800
          })
        }
        this.registerForm.get('calle').setValue(location.address.road)

      })
    },(err)=>{
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },options)
  }

  public GoogleRegister(): void{
    this.authSvc.loginGoogle();
  }

  // Solo para mostrar errores
  public get email(): any {
    // console.log(this.loginForm.get('email').pristine);
    return this.registerForm.get('email');
  }
  public get pwd(): any {
    return this.registerForm.get('pwd');
  }
  public get username(): any {
    return this.registerForm.get('username');
  }
  public get calle(): any {
    return this.registerForm.get('calle');
  }
  public get numero(): any {
    return this.registerForm.get('numero');
  }
  public get localidad(): any {
    return this.registerForm.get('localidad');
  }

}
