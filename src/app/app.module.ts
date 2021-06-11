import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


/*    Modules   */

//Shared Module
import { SharedModule } from "./shared/shared.module";
//FireBaseModule
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
//Auth Module
import { AuthModule } from "./auth/auth.module";

/*    Components    */
import { NavbarComponent } from '@components/navbar/navbar.component';
import { FooterComponent } from '@components/footer/footer.component';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { CardComponent } from '@components/card/card.component';

/*    Pages   */
import { AppComponent } from './app.component';

import { InicioComponent } from '@pages/inicio/inicio.component';
import { CarritoComponent } from '@pages/carrito/carrito.component';
import { PedidoComponent } from '@pages/pedido/pedido.component';
import { ListaPedidoComponent } from '@pages/lista-pedido/lista-pedido.component';
import { MenuComponent } from '@pages/menu/menu.component';
import { P404Component } from '@pages/p404/p404.component';
import { ComidaDetalleComponent } from '@pages/comida-detalle/comida-detalle.component';
import { LegalComponent } from '@pages/legal/legal.component';
import { SearchComponent } from './pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CarritoComponent,
    PedidoComponent,
    ListaPedidoComponent,
    MenuComponent,
    P404Component,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    SidebarComponent,
    CardComponent,
    ComidaDetalleComponent,
    LegalComponent,
    SearchComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
