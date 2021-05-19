import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit, OnChanges {

  @Input() formParent: FormGroup;
  @Input() view: string = "register";

  public childUsuarioForm: FormGroup;


  constructor() { }

  
  ngOnChanges(): void {
    this.childUsuarioForm = this.formParent;
  }

  ngOnInit(): void {
  }

  
  // Solo para mostrar errores
  public get email(): any {
    return this.childUsuarioForm.get('email');
  }
  public get pwd(): any {
    return this.childUsuarioForm.get('pwd');
  }
  public get username(): any {
    return this.childUsuarioForm.get('username');
  }
  public get telefono(): any {
    return this.childUsuarioForm.get('telefono');
  }
}
