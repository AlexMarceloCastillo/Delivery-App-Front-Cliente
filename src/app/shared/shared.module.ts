import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { OlmapsModule } from '../olmaps/olmaps.module';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { DomicilioFormComponent } from './components/domicilio-form/domicilio-form.component';


@NgModule({
  declarations: [ 
    UsuarioFormComponent, 
    DomicilioFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    OlmapsModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    OlmapsModule,
    UsuarioFormComponent, 
    DomicilioFormComponent
  ]
})
export class SharedModule { }
