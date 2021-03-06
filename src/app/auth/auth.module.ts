import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from "./auth-routing.module";

//Pages
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { OlvidoContComponent } from './olvido-cont/olvido-cont.component';

// Guards
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@guards/auth.guard';

import { SharedModule } from '../shared/shared.module';
import { SendEmailComponent } from './send-email/send-email.component';


@NgModule({
  declarations: [
    PerfilComponent,
    LoginComponent,
    RegistroComponent,
    OlvidoContComponent,
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [
    PerfilComponent,
    LoginComponent,
    RegistroComponent,
    OlvidoContComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
