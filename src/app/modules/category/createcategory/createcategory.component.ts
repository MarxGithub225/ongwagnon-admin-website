import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { categoryState, User } from 'src/assets/config/interfaces';
import { CategoryserviceService } from '../services/categoryservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.scss']
})
export class CreatecategoryComponent implements OnInit {

  moduleState : categoryState

  title = new FormControl('', Validators.required);

  loading : boolean = false;
  
  categoriesData : any[] = [];

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

      if(this.moduleState.categories && this.moduleState.categories.length > 0) {
        this.categoriesData = this.moduleState.categories
      }
    })
  }


  createCountry () {
    if(this.title.invalid 
      ) {
        this.title.markAsTouched();
        return;
      }

      const countryData = {
        title : this.title.value,
      }

      const exist = this.categoriesData.filter(country => country.title === countryData.title).length > 0 ? true : false

      if (!exist) {
        this.moduleService.saveCategory(countryData)
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
      }else {
        this.errorMessage ('Cette ctégorie existe dejà !');
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
