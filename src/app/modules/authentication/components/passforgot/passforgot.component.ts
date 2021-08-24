import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministratorserviceService } from 'src/app/modules/administrators/services/administratorservice.service';
import { AuthService} from 'src/app/services/auth/auth.service';
import { administratorState} from 'src/assets/config/interfaces';

@Component({
  selector: 'app-passforgot',
  templateUrl: './passforgot.component.html',
  styleUrls: ['./passforgot.component.scss']
})
export class PassforgotComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  adminState: administratorState

  error: string = null;
  loading = false;

  public hide = true;

  @Output() setView: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdministratorserviceService,
    private router: Router
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
  }


  goToLogin () {
    this.setView.emit('login')
  }


  resetPassword () {
    this.adminService.editPasswordAdministrator({email: this.email.value, password: this.generateChar()})
    window.location.href = '/';
  }
}
