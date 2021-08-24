import { Component, OnInit , Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { productState, User } from 'src/assets/config/interfaces';
import { ProductserviceService } from '../services/productservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.scss']
})
export class DeleteproductComponent implements OnInit {

  @Input() datas: any;
  moduleState : productState

  loading : boolean = false;
  
  constructor(
    private moduleService : ProductserviceService,
    public dialog: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  deleteAdmin () {
    

      this.moduleService.editProduct({...this.datas, state: 2})
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
