import { Component, OnInit } from '@angular/core';
import { orderState, User, userState, productState} from 'src/assets/config/interfaces';
import { OrderserviceService } from './services/orderservice.service'

import { AuthService } from 'src/app/services/auth/auth.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from 'src/app/shared/bottomsheet/bottomsheet.component';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/services/users/users.service';
import { ProductserviceService } from '../product/services/productservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  
  moduleState : orderState
  userState : User
  userModuleStae: userState
  productStet: productState

  baseUrl : string = environment.url.replace('/routes', '');
  
  products : any[] = [];
  users: any[] = [];
  
  orders: any[] = [];

  searchText;

  orderSelected: any = {
    date: null,
    user: {},
    state: null,
    data: []
  };

  isSelected = false;

  totalOrder: number;

  constructor(
    private moduleService : OrderserviceService,
    public matDialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private userService: UsersService,
    private productService: ProductserviceService
  ) { }

  public openModal = (modalWith, modalWithExt, modalRoot, modalTitle, modalDatas) => {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.width = modalWith + modalWithExt;
    dialogConfig.panelClass = "custom-dialog-container";
    dialogConfig.data = {root: modalRoot, title: modalTitle, data: modalDatas}
    this.matDialog.open(ModalComponent, dialogConfig);
  }
  
  public openBottomSheet(sheetRoot, sheetTitle, sheetDatas): void {
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.panelClass = "custom-sheet-container";
    sheetConfig.data = {root: sheetRoot, title: sheetTitle, data: sheetDatas}
    this._bottomSheet.open(BottomsheetComponent, sheetConfig);
  }

  ngOnInit(): void {
    this.moduleService.init()

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.orders && this.moduleState.orders.length > 0) {

        console.log(this.moduleState.orders)
      }

    })

    this.authService.userObservable.subscribe(state => {
      this.userState = state
    })
  }


  selectOrder (order) {
    this.isSelected =  true
    this.orderSelected = order;

  }
}