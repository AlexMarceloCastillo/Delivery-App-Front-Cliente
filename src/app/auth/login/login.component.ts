import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from "../services/auth.service";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public hide:boolean = true;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService) { 
    this.buildLoginForm();
  }

  ngOnInit(): void {}

  private buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]], //password
      // remember: [true]
    });
  }

  onSaveLogin(e: Event): void {
    e.preventDefault();
    if(this.loginForm.valid){
      const {email,pwd} = this.loginForm.value;
      this.authSvc.login(email,pwd)
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public GoogleLogin(): void{
    this.authSvc.loginGoogle();
  }

  // Solo para mostrar errores
  public get email(): any {
    return this.loginForm.get('email');
  }
  public get pwd(): any {
    return this.loginForm.get('pwd');
  }
}
