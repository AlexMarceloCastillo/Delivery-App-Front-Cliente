import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Cliente } from '@models/cliente.interface';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnDestroy {

  public usuario: Cliente;

  public clienteSubscription: Subscription;
  public isLoggedGoogle: boolean = false;

  //IMAGE USER
  //Imagen Perfil
  private file;
  public urlImage: Observable<string>;
  public uploadPercent: Observable<number>;

  constructor(private authSvc: AuthService,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.clienteSubscription = this.authSvc.getDataClient().subscribe( user => this.usuario = user, error => console.error(error) );
  }

  ngOnDestroy(): void {
    this.clienteSubscription.unsubscribe();
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
    }).catch(() => this.authSvc.toastrSvc.error('Hubo un error al cambiar la imagen','',{
      positionClass: 'toast-center-center',
      timeOut: 800
    }))
  }

}