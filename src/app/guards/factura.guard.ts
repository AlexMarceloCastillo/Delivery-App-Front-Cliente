import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { PedidoService } from '@services/pedido/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaGuard implements CanActivate {
  constructor(private pedido: PedidoService,private router: Router, private toastSvc: ToastrService, private authSvc: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let id =route.paramMap.get('pid');
    if(id){
      this.pedido.getOne(id).subscribe(e => {
        this.authSvc.getDataClient()
        .subscribe(cliente => {
          if(e.Cliente.firebase_id != cliente.uid){
            this.router.navigate(['inicio'])
            this.toastSvc.error('No tiene un pedido con ese ID ','',{
              positionClass: 'toast-center-center',
              timeOut: 2500
            })
          }
        })
        if(e && e.estado == "entregado"){
          return true;
        }else if (e.estado != 'entregado'){
          this.router.navigate(['inicio'])
          this.toastSvc.error('Su pedido no se encuentra disponible para ver la factura','',{
            positionClass: 'toast-center-center',
            timeOut: 2500
          })
        }else{
          this.router.navigate(['inicio'])
          this.toastSvc.error('Su pedido no existe','',{
            positionClass: 'toast-center-center',
            timeOut: 2500
          })
        }
      })
      return true;
    }else{
      return false;
    }
  }

}
