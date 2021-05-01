import { HttpClient } from '@angular/common/http';
import { OnChanges, Component, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { Domicilio } from '@models/domicilio.interface';
import { Cliente } from '@models/cliente.interface';
import guaymallen from '@assets/json/guaymallen.json';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormUserComponent implements OnChanges {
  @Input() clienteObs: Observable<Cliente> = null;
  @Input() isRegister: boolean = true;
  @Input() isLoggedGoogle: boolean = false;
  @Input() titulo: string =""
  public userForm: FormGroup;
  public guaymallen = guaymallen;
  private latHome = null;
  private lonHome = null;
  private domicilio: Domicilio;
  private uid: string;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService, private httpClient: HttpClient) {
    this.buildUserForm()
  }
  ngOnChanges(changes: SimpleChanges) {
    if(!this.isRegister){
      changes.clienteObs.currentValue.subscribe((user:any) => {
        if(user){
          this.uid = user.uid;
          this.userForm.get('email').setValue(user.email)
          this.userForm.get('username').setValue(user.nombre)
          if(user.domicilio != null){
            this.userForm.get('calle').setValue(user.domicilio.calle)
            this.userForm.get('numero').setValue(user.domicilio.numero)
            this.userForm.get('localidad').setValue(user.domicilio.localidad)
          }
          this.userForm.controls['pwd'].setValidators([Validators.minLength(8),Validators.maxLength(16)])
          this.userForm.controls['pwd'].updateValueAndValidity()
        }
      })
      this.userForm.controls['calle'].setValidators([Validators.minLength(5),Validators.maxLength(25)])
      this.userForm.controls['calle'].updateValueAndValidity()
      this.userForm.controls['numero'].setValidators([Validators.min(1),Validators.max(9999999)])
      this.userForm.controls['numero'].updateValueAndValidity()
      this.userForm.controls['localidad'].setValidators([Validators.minLength(5),Validators.maxLength(15)])
      this.userForm.controls['localidad'].updateValueAndValidity()
    }
  }

  private buildUserForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(16)]], //password
      username: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      calle: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      numero:[0,[Validators.required,Validators.min(1),Validators.max(9999999)]],
      localidad: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]

    });
  }

  onSaveRegister(e: Event): void {
    e.preventDefault();
    console.log(this.userForm.value)
    if(this.userForm.valid){
      const {email,pwd,username} = this.userForm.value;
      this.domicilio = {
        calle: this.userForm.get('calle').value,
        numero: this.userForm.get('numero').value,
        localidad: this.userForm.get('localidad').value      ,
        latitud: this.latHome,
        longitud: this.lonHome
      };
      this.authSvc.register(email,pwd,username,this.domicilio)
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
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
                this.userForm.get('localidad').setValue(localidad.trim())
              }
            })
          }
        }
        if(this.userForm.get('localidad').value == ""){
          this.authSvc.toastrSvc.error('Su distrito no esta disponible para el delivery, solo retiro en el local',
          'Por favor seleccione la opcion de retiro en el local',{
            positionClass: 'toast-center-center',
            timeOut: 800
          })
        }
        this.userForm.get('calle').setValue(location.address.road)

      })
    },(err)=>{
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },options)
  }

  public GoogleRegister(): void{
    this.authSvc.loginGoogle();
  }
  public onUpdateProfile(){
    console.log(this.userForm.value)
    const {email,pwd,username,calle,numero,localidad} = this.userForm.value
    if(pwd != ""){
      //Cambiar Contraseña
      this.onUpdatePassword(pwd)
    }
    const userUpdate:any = {
      uid: this.uid,
      nombre: username,
      domicilio: {
        calle: calle,
        localidad: localidad,
        numero: numero,
        latitud: this.latHome,
        longitud: this.lonHome
      }
    }
    this.authSvc.updateProfile(userUpdate);
  }

  onUpdatePassword(pwd: string){
    this.authSvc.isAuth().subscribe((user)=>{
      user.updatePassword(pwd)
      .then(()=>{
        this.authSvc.toastrSvc.success('','Contraseña Actualizada',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
      })
      .catch((err)=>{
        this.authSvc.getError(err.code,'Error al Actualizar la Contraseña')
      })
    })
  }

  // Solo para mostrar errores
  public get email(): any {
    // console.log(this.loginForm.get('email').pristine);
    return this.userForm.get('email');
  }
  public get pwd(): any {
    return this.userForm.get('pwd');
  }
  public get username(): any {
    return this.userForm.get('username');
  }
  public get calle(): any {
    return this.userForm.get('calle');
  }
  public get numero(): any {
    return this.userForm.get('numero');
  }
  public get localidad(): any {
    return this.userForm.get('localidad');
  }

}
