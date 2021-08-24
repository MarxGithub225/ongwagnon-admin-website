import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { administratorState, User } from 'src/assets/config/interfaces';
import { AdministratorserviceService } from '../services/administratorservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createadministrator',
  templateUrl: './createadministrator.component.html',
  styleUrls: ['./createadministrator.component.scss']
})
export class CreateadministratorComponent implements OnInit {
  moduleState : administratorState

  email = new FormControl('', [Validators.required, Validators.email]);
  level = new FormControl('', Validators.required);

  loading : boolean = false;
  
  administratorsData : any[] = [];

  constructor(
    private moduleService : AdministratorserviceService,
    public dialog: MatDialogRef<ModalComponent>,
    public snack : MatSnackBar
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

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.admins && this.moduleState.admins.length > 0) {
        this.administratorsData = this.moduleState.admins
      }
    })
  }


  createAdmin () {
    if(this.email.invalid ||
      this.level.invalid
      ) {
        this.email.markAsTouched();
        this.level.markAsTouched();
        return;
      }

      const adminData = {
        email : this.email.value,
        level : this.level.value,
        state : 1,
        date : new Date().getTime(),
        password : this.generateChar(),
      }

      const exist = this.administratorsData.filter(admin => admin.email === adminData.email).length > 0 ? true : false
      
      if (!exist) {
        this.moduleService.saveAdministrator(adminData)
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
      }else {
        this.errorMessage ('Cet administrateur existe dejà !');
      }
  }

  errorMessage(a): void {
    this.snack.open(a, '',
  
    {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'danger-alert'
    }
  
    ) ;
  }
}
