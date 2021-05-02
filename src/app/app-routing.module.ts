import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from '@guards/auth.guard';
import { ComidaDetalleComponent } from '@pages/comida-detalle/comida-detalle.component';

//Pages
import { CarritoComponent } from '@pages/carrito/carrito.component';
import { ClosedComponent } from '@pages/closed/closed.component';
import { InicioComponent } from '@pages/inicio/inicio.component';
import { ListaPedidoComponent } from '@pages/lista-pedido/lista-pedido.component';
import { MenuComponent } from '@pages/menu/menu.component';
import { P404Component } from '@pages/p404/p404.component';
import { PedidoComponent } from '@pages/pedido/pedido.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'carrito', component: CarritoComponent, canActivate:[AuthGuard] },
  { path: 'pedido', component: PedidoComponent, canActivate:[AuthGuard]},
  { path: 'lista-pedido', component: ListaPedidoComponent, canActivate:[AuthGuard] },
  { path: 'menu', component: MenuComponent },
  { path: 'comida/:id', component: ComidaDetalleComponent },
  { path: 'closed', component: ClosedComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  { path: '', redirectTo:'inicio', pathMatch:'full'},
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
