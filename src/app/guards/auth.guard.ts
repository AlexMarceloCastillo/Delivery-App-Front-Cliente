import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.isAuth()
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth => {
      if(!auth){
        this.authSvc.toastrSvc.error('Necesita loguearse!!','',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
        this.authSvc.router.navigate(['/login'])
      }
    })
    );
  }
}
