import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Cliente } from "@models/cliente.interface";
import { Domicilio } from "@models/domicilio.interface";


@Injectable({
  providedIn: 'root'
})
export class FormDataBuildService {

  constructor( private formBuilder: FormBuilder ) { }

  /**
   * @description
   * Crea una nueva instancia mediante FormGroup para los siguientes valores
   * {email, pwd, username, telefono}.
   * @param view Vista en la cual se llama al formulario; Default: "registro".
   * @param userData Información del usuario para llenar el formulario de retorno.
   * @returns FormGroup
   */
  public userProfileForm(view: string = 'registro', userData: any = {}): FormGroup {
    let userFormGroup: FormGroup;

    if (view === "profile") {
      userFormGroup = this.formBuilder.group({
        username: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        telefono: [0,[Validators.required]]
      });
    } else {
      userFormGroup = this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        pwd: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(16)]], //password
        username: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        telefono: [0,[Validators.required]]
      });
    }

    if(userData) {
      userFormGroup.patchValue(userData);
    }
    
    return userFormGroup;
  }

  /**
   * @description
   * Crea una nueva instancia mediante FormGroup para los siguientes valores
   * {calle, numero, domicilio}
   * @param userData Información del usuario para llenar el formulario de retorno.
   * @returns FormGroup
   */
  public userDomicilioForm(userData: any = {}): FormGroup {
    let domicilioFormGroup = this.formBuilder.group({
      calle: ['', [ Validators.required ,Validators.minLength(5), Validators.maxLength(25)] ],
      numero:[0, [ Validators.required, Validators.min(1)] ],
      localidad: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(15)] ],
      latitud: [ 0 ],
      longitud: [ 0 ],
      local: [ true ]
    });

    if (userData.domicilio) {
      domicilioFormGroup.patchValue(userData.domicilio);
      domicilioFormGroup.patchValue({ local: false })
    }

    return domicilioFormGroup;
  }
}