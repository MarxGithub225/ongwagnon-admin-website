import { Component, OnInit } from '@angular/core';
import { eventState } from 'src/assets/config/interfaces';
import { EventserviceService } from './services/eventservice.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from 'src/app/shared/bottomsheet/bottomsheet.component';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');

  moduleState : eventState

  searchText;

  constructor(
    private moduleService : EventserviceService,
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

    console.log('okkkk')
    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

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
