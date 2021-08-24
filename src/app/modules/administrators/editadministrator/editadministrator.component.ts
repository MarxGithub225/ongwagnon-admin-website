import { Component, OnInit , Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { administratorState, User } from 'src/assets/config/interfaces';
import { AdministratorserviceService } from '../services/administratorservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-editadministrator',
  templateUrl: './editadministrator.component.html',
  styleUrls: ['./editadministrator.component.scss']
})
export class EditadministratorComponent implements OnInit {
  @Input() datas: any;
  moduleState : administratorState

  email = new FormControl('', [Validators.required, Validators.email]);
  lastname = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);

  loading : boolean = false;
  
  constructor(
    private moduleService : AdministratorserviceService,
    public dialog: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {

    this.email.reset(this.datas.email);
    this.lastname.reset(this.datas.lastname);
    this.firstname.reset(this.datas.firstname);

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  editAdmin () {
    
      const adminData = {
        ...this.datas,
        email : this.email.value,
        lastname : this.lastname.value,
        firstname : this.firstname.value,
        password: ''
      }

      this.moduleService.editAdministrator(adminData)
      .then(res => {
        if(res) {
          this.loading = false;
          this.dialog.close();
        }
      })
  }
}
