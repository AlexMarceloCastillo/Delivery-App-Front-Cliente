import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//FireBaseModules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
//Toast
//Components
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ListaPedidoComponent } from './pages/lista-pedido/lista-pedido.component';
import { MenuComponent } from './pages/menu/menu.component';
import { P404Component } from './pages/p404/p404.component';
import { ClosedComponent } from './pages/closed/closed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthService } from '@auth/auth.service';
import { AuthGuard } from '@guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CarritoComponent,
    PedidoComponent,
    ListaPedidoComponent,
    MenuComponent,
    P404Component,
    ClosedComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    SidebarComponent,
    PerfilComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
