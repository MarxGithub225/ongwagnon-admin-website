import { Component, OnInit } from '@angular/core';
import { productState } from 'src/assets/config/interfaces';
import { ProductserviceService } from './services/productservice.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from 'src/app/shared/bottomsheet/bottomsheet.component';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');

  moduleState : productState

  searchText;

  constructor(
    private moduleService : ProductserviceService,
    public matDialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,
    private router: Router,
  ) { }


  public openModal = (modalWith, modalWithExt, modalRoot, modalTitle, modalDatas) => {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.width = modalWith + modalWithExt;
    dialogConfig.panelClass = "custom-dialog-container";
    dialogConfig.data = {root: modalRoot, title: modalTitle, data: modalDatas}
    this.matDialog.open(ModalComponent, dialogConfig);
  }
  
  openBottomSheet(sheetRoot, sheetTitle, sheetDatas): void {
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.panelClass = "custom-sheet-container";
    sheetConfig.data = {root: sheetRoot, title: sheetTitle, data: sheetDatas}
    this._bottomSheet.open(BottomsheetComponent, sheetConfig);
  }

  ngOnInit(): void {
    this.moduleService.init()

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      console.log(this.moduleState.products)
    })
  }


  editProductState (product, state) {
    const productData = {
      ...product,
      state : state
    }
    this.moduleService.editProduct(productData)
  }


  getTing (event) {
    console.log(event)
  }
}
