import { Component, OnInit } from '@angular/core';
import { AdministratorserviceService } from 'src/app/modules/administrators/services/administratorservice.service';
import { AuthService} from 'src/app/services/auth/auth.service';
import { navbarState, User, administratorState} from 'src/assets/config/interfaces';
import { NavbarserviceService } from '../../services/navbarservice.service';

@Component({
  selector: 'app-profilside',
  templateUrl: './profilside.component.html',
  styleUrls: ['./profilside.component.scss']
})
export class ProfilsideComponent implements OnInit {
  moduleState : navbarState
  userState : User
  adminState: administratorState

  constructor(
    private navbarservice: NavbarserviceService,
    private authService: AuthService,
    private adminService: AdministratorserviceService
  ) { }

  public generateChar = () =>{
    let length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"+ new Date().getTime(),
    retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n)).toUpperCase();
    }
    
    return retVal;
  }

  ngOnInit(): void {

    this.navbarservice.stateObservable.subscribe(state => {
      this.moduleState = state
      
    })

    this.authService.userObservable.subscribe(state => {
      this.userState = state
    })
  }


  logout () {
    this.authService.logout()
  }

  resetPassword (userState) {
    this.adminService.editPasswordAdministrator({...userState, password: this.generateChar()})
  }
}
