import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Cliente } from '@models/cliente.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public cliente: Cliente = {
    uid: "",
    nombre: "",
    email: "",
    photoURL: '',
    domicilio: {
      calle: '',
      localidad: '',
      numero: 0
    }
  };
  public clienteObs: Observable<Cliente>;

  public isLoggedGoogle: boolean = false;

  //IMAGE USER
  //Imagen Perfil
  private file;
  public urlImage: Observable<string>;
  public uploadPercent: Observable<number>;

  constructor(private authSvc: AuthService,private storage: AngularFireStorage) {
    this.clienteObs = this.authSvc.getDataClient();
    this.authSvc.getDataClient().subscribe(data => {
      if(data){
        this.cliente.uid = data.uid;
        this.cliente.nombre = data.nombre;
        this.cliente.email = data.email;
        this.cliente.photoURL = data.photoURL;
        if(data.domicilio){
          this.cliente.domicilio = data.domicilio
        }
      }
    })
    // Si esta logueado por google no necesita contraseña
    this.authSvc.isAuth().subscribe((user)=>{
      if(user){
        if(user.providerData[0].providerId == 'google.com'){
          this.isLoggedGoogle = true;
        }
      }
    })

  }

  ngOnInit(): void {
  }

  //Cargar imagen
  onFile(e: {target: {files: any[];};}){
    this.file = e.target.files[0]
    this.authSvc.toastrSvc.success('La imagen se esta cargando','',{
      positionClass: 'toast-center-center',
      timeOut: 200
    })
    this.onUpload()
  }
  //Subir Imagen
  async onUpload(){
    const file = this.file;
    const filePath = `uploads/clients/profile_${this.cliente.uid}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
    await task.then(()=>{
      this.urlImage.subscribe((url)=>{
        this.cliente.photoURL = url
        this.authSvc.updateProfile(this.cliente)
        this.authSvc.toastrSvc.success('Imagen Cargada con Exito','',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
      })
    }).catch(() => this.authSvc.toastrSvc.error('Hubo un error al cambiar la imagen','',{
      positionClass: 'toast-center-center',
      timeOut: 800
    }))
  }

}
