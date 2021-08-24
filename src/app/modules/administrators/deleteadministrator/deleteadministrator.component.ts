import { Component, OnInit , Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { administratorState, User } from 'src/assets/config/interfaces';
import { AdministratorserviceService } from '../services/administratorservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-deleteadministrator',
  templateUrl: './deleteadministrator.component.html',
  styleUrls: ['./deleteadministrator.component.scss']
})
export class DeleteadministratorComponent implements OnInit {

  @Input() datas: any;
  moduleState : administratorState

  loading : boolean = false;
  
  constructor(
    private moduleService : AdministratorserviceService,
    public dialog: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  deleteAdmin () {
    

      this.moduleService.deleteAdministrator({...this.datas, password: ''})
      .then(res => {
        if(res) {
          this.loading = false;
          this.dialog.close();
        }
      })
  }

  cancel () {
    this.dialog.close();
  }

}
