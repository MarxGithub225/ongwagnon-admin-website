import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);


  loading : boolean = false;

  @Output() setView: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  passForgot () {
    this.setView.emit('passforgot')
  }

  
  login() {

    this.loading = true;

    const data = {
      email : this.email.value,
      password : this.password.value
    }

    this.authService.login(data)
    .then(res => {
      this.loading = false;
    })
  }


}
