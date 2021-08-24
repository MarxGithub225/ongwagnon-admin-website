import { Component, OnInit , Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { categoryState, User } from 'src/assets/config/interfaces';
import { CategoryserviceService } from '../services/categoryservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-deletesubcategory',
  templateUrl: './deletesubcategory.component.html',
  styleUrls: ['./deletesubcategory.component.scss']
})
export class DeletesubcategoryComponent implements OnInit {

  @Input() datas: any;
  moduleState : categoryState

  name = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);

  loading : boolean = false;
  
  constructor(
    private moduleService : CategoryserviceService,
    public dialog: MatDialogRef<ModalComponent>,
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
    })
  }


  deleteCountry () {
    
    this.moduleService.deleteSubCategory(this.datas)
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
