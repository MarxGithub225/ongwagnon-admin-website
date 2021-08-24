import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { categoryState, User } from 'src/assets/config/interfaces';
import { CategoryserviceService } from '../services/categoryservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-createsubcategory',
  templateUrl: './createsubcategory.component.html',
  styleUrls: ['./createsubcategory.component.scss']
})
export class CreatesubcategoryComponent implements OnInit {

  moduleState : categoryState

  title = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);

  loading : boolean = false;
  subacetgoriesData: any[] = [];
  
  constructor(
    private moduleService : CategoryserviceService,
    public dialog: MatDialogRef<ModalComponent>,
    private snack: MatSnackBar
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
      if(this.moduleState.subacetgories && this.moduleState.subacetgories.length > 0) {
        this.subacetgoriesData = this.moduleState.subacetgories
      }
    })
  }


  createCity () {
    if(
      this.title.invalid ||
      this.category.invalid
      ) {
        this.title.markAsTouched();
        this.category.markAsTouched();
        return;
      }

      const cityData = {
        title : this.title.value,
        category : this.category.value,
      }

      const exist = this.subacetgoriesData.filter(city => city.title === cityData.title).length > 0 ? true : false

      if (!exist) {
        this.moduleService.saveSubCategory(cityData)
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
      }else {
        this.errorMessage ('Cette sous catégorie existe dejà !');
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
