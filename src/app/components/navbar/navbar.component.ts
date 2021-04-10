import { Component, OnInit } from '@angular/core';

import { TogglerService } from 'src/app/services/toggler/toggler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private togglerSvc: TogglerService) { }

  ngOnInit(): void {
  }

  public onToggle(e: Event): void {
    e.preventDefault();
    this.togglerSvc.toggle(!this.togglerSvc.statusSubject.getValue());
  }
}
