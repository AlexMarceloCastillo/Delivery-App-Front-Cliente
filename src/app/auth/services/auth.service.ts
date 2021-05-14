import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { Cliente } from '@models/cliente.interface';
import { Domicilio } from '@models/domicilio.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public openDelivery: boolean = false;

  constructor(public afsAuth: AngularFireAuth,public afs: AngularFirestore,public router: Router,public toastrSvc: ToastrService) {
    this.isOpen();
  }

   //Reset de password
   async resetPassword(email:string):Promise<void>{
    try{
      return this.afsAuth.sendPasswordResetEmail(email);
    }catch(error){
      this.getError(error.code,'Error')
    }
   }

  //Email de verificacion
  async sendVerificationEmail():Promise<void>{
    return (await this.afsAuth.currentUser).sendEmailVerification();
  }

  //Login
  async login(email: string, pwd: string): Promise<Cliente>{
    try{
      const { user } = await this.afsAuth.signInWithEmailAndPassword(email,pwd);
      this.successLogin('Logueado Correctamente!')
      this.setStatus(true)
      return user;
    } catch(error) {
      this.getError(error.code,'Error al loguearse')
    }
  }

  //GoogleLogin
  async loginGoogle(): Promise<Cliente>{
    try{
      const { user } = await this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      this.getDataClient().subscribe( e =>{
        if(!e){
          this.saveClientData(user,user.displayName,user.phoneNumber,null);
        }else{
          this.setStatus(true);
        }
      })
      this.successLogin('Logueado Correctamente!');
      return user;
    }catch(error){
      this.getError(error.code,'Error al loguearse con Google');
    }
  }

  //Register
  async register(clienteRegisterForm: any, domicilio: Domicilio) {
    let { email, pwd } = clienteRegisterForm;
    let { telefono, username } = clienteRegisterForm;

    try {
      const { user } = await this.afsAuth.createUserWithEmailAndPassword( email, pwd);

      this.saveClientData(user, username, telefono, domicilio);
      this.successLogin('Registrado Correctamente !');
      this.sendVerificationEmail();
      return user;
    }
    catch(error){
      this.getError(error.code,'Error al registrarse');
      console.log(error);
    }
  }

  //LogOut
  async logOut() {
    this.setStatus(false);
    this.successLogin('Sesion Cerrada con Exito');
    try {
      await this.afsAuth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  //Obtener estado de login
  isAuth(): any{
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  //Obtener datos de usuario
  getDataClient(){
    return this.afsAuth.authState.pipe(
      switchMap((data)=>{
        if(data){
          return this.afs.doc<Cliente>(`/clients/${data.uid}`).valueChanges();
        }
        return of(null)
      })
    );
  }

  //Redireccionar al inicio
  async successLogin(title:string): Promise<void>{
    this.toastrSvc.success(title,'',{
      positionClass: 'toast-top-right',
      timeOut: 800
    })
    const user = await this.afsAuth.currentUser;

    if(user && user.emailVerified){
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/auth/verification']);
    }

  }

  //Guardar el cliente en una coleccion de Firestore
  private saveClientData(cliente: any, username: string, telefono: any, domicilio: Domicilio) {
    console.log(cliente);

    //Referencia de usuario a guardar
      const userRef: AngularFirestoreDocument<Cliente> = this.afs.doc(`clients/${cliente.uid}`);
      const data: Cliente = {
        uid: cliente.uid,
        email:cliente.email,
        nombre: username,
        telefono: telefono,
        photoURL: cliente.photoURL,
        estado: 1,
        domicilio: domicilio,
        role: 0,
        online: true,
        provider: cliente.providerData[0].providerId
      }
      return userRef.set(data,{merge:true});
  }

  //Actualizar datos de usuario en Firestore
  public updateProfile(cliente: Cliente){
    const userRef: AngularFirestoreDocument<Cliente> = this.afs.doc(`clients/${cliente.uid}`);
    userRef.update(cliente)
      .then( () => {
          this.toastrSvc.success('','Datos Actualizados con Exito',{
          positionClass: 'toast-top-right',
          timeOut: 800});
        }
      ).catch( error => {
          this.toastrSvc.error('Error',`${error}`,{
            positionClass: 'toast-bottom-right',
            timeOut: 800
          });
        }
      );
  }

  setStatus(online: boolean){
    this.isAuth()
    .subscribe(user =>{
      if(user){
        const userRef: AngularFirestoreDocument<Cliente> = this.afs.doc(`clients/${user.uid}`);
        const data: any = { online };
        userRef.update(data);
      }
    });
  }

  isOpen(){
    const today = new Date();
    const hoursWeeknd = [20,21,22,23,24];
    const hoursEndWkd = [11,12,13,14,15];

    if(today.getDay() == (6 || 7)){
      for(var e of hoursEndWkd){
        hoursWeeknd.push(e)
      }
    }

    var hour = hoursWeeknd.filter((hrs)=>{
      return hrs == today.getHours()
    })

    if(hour[0] == null){
      this.openDelivery = false;
    }else{
      this.openDelivery = true;
    }
  }

  //Errores de firebase
  public getError(ind: string,titulo: string){
    const code=['auth/user-not-found',
    'auth/invalid-email',
    'auth/wrong-password',
    'auth/email-already-in-use',
    'auth/too-many-requests',
    'auth/requires-recent-login'];

    const message=['Usuario no encontrado',
    'Email invalido',
    'La contraseña es incorrecta',
    'El email ya esta en uso',
    'El acceso a esta cuenta ha sido temporalmente deshabilitado',
    'Para realizar esta operacion necesita estar logueado recientemente'];

    const index = code.indexOf(ind);
    const mss = message[index];

    this.toastrSvc.error(mss,titulo,{
      positionClass: 'toast-bottom-right',
    });
  }
}
