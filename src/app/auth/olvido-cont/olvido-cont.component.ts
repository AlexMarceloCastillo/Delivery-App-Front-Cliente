import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';



@Component({
  selector: 'auth-olvido-cont',
  templateUrl: './olvido-cont.component.html',
  styleUrls: ['./olvido-cont.component.scss'],
  providers: [AuthService],
})
export class OlvidoContComponent implements OnInit {

  userEmail = new FormControl('');

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset(){
    try{
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Email enviado, revisa tu correo');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error', error);
    }
  }
}
