import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { OlvidoContComponent } from './olvido-cont/olvido-cont.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { SendEmailComponent } from './send-email/send-email.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'perfil/:id', component: PerfilComponent, canActivate:[AuthGuard] },
  { path: 'verification', component: SendEmailComponent },
  { path: 'olvido-clave', component: OlvidoContComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
