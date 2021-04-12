import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TogglerService } from '@services/toggler/toggler.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(private togglerSvc: TogglerService, private routerSvc: Router) { }

  ngOnInit(): void {
    this.routerSvc.events.subscribe( (value) =>{
      if (value instanceof NavigationEnd) {
        this.onToggle();
      } else {
        this.togglerSvc.toggle(false);
      }
    });
  }

  public get toggleStatus(): TogglerService {
    return this.togglerSvc;
  }

  public onToggle(): void{
    this.togglerSvc.toggle(!this.togglerSvc.statusSubject.getValue());
  }
}
