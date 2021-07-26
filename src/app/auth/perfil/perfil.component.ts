import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { FormDataBuildService } from '@shared/services/form-data-build.service';

import { Cliente } from '@models/cliente.interface';


@Component({
  selector: 'auth-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnChanges, OnDestroy {

  public usuario: Cliente;

  public clienteSubscription: Subscription;
  public isLoggedGoogle: boolean = false;

  //IMAGE USER
  //Imagen Perfil
  private file;
  public urlImage: Observable<string>;
  public uploadPercent: Observable<number>;

  public parentUserForm: FormGroup;
  public parentDomicilioForm: FormGroup;


  constructor(private authSvc: AuthService,private storage: AngularFireStorage, private formDataBuildSvc: FormDataBuildService) { }


  ngOnChanges(): void {

  }

  ngOnInit(): void {
    this.clienteSubscription = this.authSvc.getDataClient().subscribe( user => {
      this.usuario = user;
      this.fillForm(user);
    }, error => console.error(error) );
  }

  ngOnDestroy(): void {
    this.clienteSubscription.unsubscribe();
  }

  //Cargar imagen
  onFile(e: {target: {files: any[];};}){
    this.file = e.target.files[0]
    this.authSvc.toastrSvc.success('La imagen se esta cargando','',{
      positionClass: 'toast-center-center',
      timeOut:2000
    })
    this.onUpload()
  }
  //Subir Imagen
  async onUpload(){
    const file = this.file;
    const filePath = `uploads/clients/profile_${this.usuario.uid}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
    await task.then(()=>{
      this.urlImage.subscribe((url)=>{
        this.usuario.photoURL = url
        this.authSvc.updateProfile(this.usuario)
        this.authSvc.toastrSvc.success('Imagen Cargada con Exito','',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
      })
      setTimeout(()=>{window.location.reload()},2000)
    }).catch(() => this.authSvc.toastrSvc.error('Hubo un error al cambiar la imagen','',{
      positionClass: 'toast-center-center',
      timeOut: 800
    }))
  }

  /**
   * @description
   * Llena el formulario con información del usuario
   * @param user Objeto de Firebase Store (user)
   */
  private fillForm(user: any) {
    let auxUserObj = {
      username: user.nombre,
      telefono: user.telefono
    };
    this.parentUserForm = this.formDataBuildSvc.userProfileForm('profile', auxUserObj);
    this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm(user);
  }


  public onUpdateProfile(e: Event): void {
    let { username, telefono } = this.parentUserForm.value;

    let clienteUpdated: Cliente = {
      ...this.usuario,
      telefono,
      nombre: username,
      domicilio: this.parentDomicilioForm.value
    };
    this.authSvc.updateProfile(clienteUpdated);
  }
}
