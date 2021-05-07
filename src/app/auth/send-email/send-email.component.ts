import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService],
})
export class SendEmailComponent implements OnInit {

  public user$:Observable<any> = this.authSvc.afsAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

}
