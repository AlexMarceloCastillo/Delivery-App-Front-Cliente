import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';
import { FormDataBuildService } from '@shared/services/form-data-build.service';

import { Domicilio } from '@models/domicilio.interface';


@Component({
  selector: 'auth-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{

  public parentUserForm: FormGroup;
  public parentDomicilioForm: FormGroup;

  private domicilio: Domicilio = null;

  constructor( private authSvc: AuthService, private formDataBuildSvc: FormDataBuildService ) { }


  ngOnInit(): void {
    this.parentUserForm = this.formDataBuildSvc.userProfileForm();
    this.parentDomicilioForm = this.formDataBuildSvc.userDomicilioForm();
  }


  onSaveRegister(e: Event): void {
    e.preventDefault();
    if(this.parentUserForm.valid) {
      if( this.parentDomicilioForm.valid && !this.parentDomicilioForm.value.local )
        this.domicilio = { ...this.parentDomicilioForm.value };

      this.authSvc.register(this.parentUserForm.value, this.domicilio);
      this.parentUserForm.reset();
      this.parentDomicilioForm.reset();
    } else {
      this.parentUserForm.markAllAsTouched();
    }
  }

  public GoogleRegister(): void{
    this.authSvc.loginGoogle();
  }
}