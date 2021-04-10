import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ClosedComponent } from './pages/closed/closed.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaPedidoComponent } from './pages/lista-pedido/lista-pedido.component';
import { MenuComponent } from './pages/menu/menu.component';
import { P404Component } from './pages/p404/p404.component';
import { PedidoComponent } from './pages/pedido/pedido.component';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'lista-pedido', component: ListaPedidoComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'closed', component: ClosedComponent },
  { path: '', redirectTo:'inicio', pathMatch:'full'},
  { path: '**', component: P404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }