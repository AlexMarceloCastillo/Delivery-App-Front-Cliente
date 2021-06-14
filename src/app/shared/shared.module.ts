import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { OlmapsModule } from '../olmaps/olmaps.module';

import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { DomicilioFormComponent } from './components/domicilio-form/domicilio-form.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SpinnerLoadComponent } from './components/spinner-load/spinner-load.component';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    DomicilioFormComponent, 
    SearchFormComponent, 
    SpinnerLoadComponent
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
    DomicilioFormComponent,
    SearchFormComponent,
    SpinnerLoadComponent
  ]
})
export class SharedModule { }
