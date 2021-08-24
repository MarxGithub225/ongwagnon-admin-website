import { Component, OnInit , Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { categoryState, User } from 'src/assets/config/interfaces';
import { CategoryserviceService } from '../services/categoryservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.scss']
})
export class DeletecategoryComponent implements OnInit {

  @Input() datas: any;
  moduleState : categoryState

  name = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);

  loading : boolean = false;
  

  subcategories : any[] = [];
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

      if(this.moduleState.subacetgories && this.moduleState.subacetgories.length > 0) {
        this.subcategories = this.moduleState.subacetgories
      }
    })
  }


  deleteCountry () {
    
  let subacetoriesData = this.subcategories.filter(subcat => subcat.category === this.datas.id);

  if(subacetoriesData.length > 0) {
    subacetoriesData.forEach(subcat => {
      this.moduleService.deleteSubCategory(subcat)
    })

    setTimeout(() => {
      this.moduleService.deleteCategory(this.datas)
    .then(res => {
      if(res) {
        this.loading = false;
        window.location.reload();
        this.dialog.close();
      }
    })
    }, 500);
  }else {
    this.moduleService.deleteCategory(this.datas)
    .then(res => {
      if(res) {
        this.loading = false;
        
        this.dialog.close();
      }
    })
  }
  
  }

  cancel () {
    this.dialog.close();
  }
}
