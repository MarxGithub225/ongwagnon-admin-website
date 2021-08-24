import { Component, OnInit } from '@angular/core';
import { navbarState } from 'src/assets/config/interfaces';
import { NavbarserviceService } from './services/navbarservice.service';
import { navBarConfig } from 'src/assets/config/general';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  moduleState : navbarState

  menuState:string = 'out';
  mobileMenuState:string = 'out';

  appConfig = {
    navBarConfig
  };

  constructor(
    private navbarservice: NavbarserviceService
  ) { }

  ngOnInit(): void {
    this.navbarservice.stateObservable.subscribe(state => {
      this.moduleState = state
    })
  }

  activeUserSide () {
    this.navbarservice.setUserSide(true)
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  unActiveUserSide () {
    this.navbarservice.setUserSide(false)
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  menuActive() {
    this.mobileMenuState = this.mobileMenuState === 'out' ? 'in' : 'out';
  }

}
