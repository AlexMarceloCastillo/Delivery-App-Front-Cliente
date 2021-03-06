import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from '@guards/auth.guard';
import { ComidaDetalleComponent } from '@pages/comida-detalle/comida-detalle.component';

//Pages
import { CarritoComponent } from '@pages/carrito/carrito.component';
import { InicioComponent } from '@pages/inicio/inicio.component';
import { ListaPedidoComponent } from '@pages/lista-pedido/lista-pedido.component';
import { MenuComponent } from '@pages/menu/menu.component';
import { P404Component } from '@pages/p404/p404.component';
import { PedidoComponent } from '@pages/pedido/pedido.component';
import { LegalComponent } from '@pages/legal/legal.component';
import { SearchComponent } from '@pages/search/search.component';
import { FacturaComponent } from '@pages/factura/factura.component';
import { FacturaGuard } from '@guards/factura.guard';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 30],
};

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: ':uid/pedidos/:pid', component: PedidoComponent, canActivate:[AuthGuard] },
  { path: ':uid/pedidos', component: ListaPedidoComponent, canActivate:[AuthGuard] },
  { path: ':uid/factura/:pid', component: FacturaComponent, canActivate:[FacturaGuard]},
  { path: 'menu', component: MenuComponent },
  { path: 'search', component: SearchComponent },
  { path: 'comida/:id', component: ComidaDetalleComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  { path: '', redirectTo:'inicio', pathMatch:'full'},
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
