import { Component, OnInit, Input} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormControl, Validators } from '@angular/forms';

import { eventState, User } from 'src/assets/config/interfaces';
import { EventserviceService } from '../services/eventservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {

  @Input() datas: any;

  moduleState : eventState

  label = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  loading : boolean = false;
  
  
  constructor(
    private moduleService : EventserviceService,
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

  convertDate (initDate) {
    const date = new Date(Number(initDate));
    const Day = String(date.getDate()).padStart(2, '0');
    const Month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const Year = date.getFullYear();

    return  (Year + '-' + Month + '-' + Day);
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '150px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultFontSize: '3',
    uploadWithCredentials: true,
    sanitize: true,
    uploadUrl: 'https://api.mlmlongrichci.com/upload', // if needed
    toolbarHiddenButtons:   [
      [],
      [
        'removeFormat',
        'toggleEditorMode',
        'insertImage',
        'insertVideo'
      ]
    ]
  };
  
  ngOnInit(): void {

    this.label.reset(this.datas.label);
    this.address.reset(this.datas.address);
    this.description.reset(this.datas.description);
    this.date.reset(this.convertDate(this.datas.date));


    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  createCountry () {
      
      const countryData = {
        ...this.datas,
        label: this.label.value,
        address: this.address.value,
        description: this.description.value,
        date: new Date(this.date.value).getTime()
      }

      this.moduleService.editProduct(countryData)
      .then(res => {
        if(res) {
          this.loading = false;
          this.dialog.close();
        }
      })

      
  }


  deleteCountry () {
      

    this.moduleService.deleteProduct(this.datas)
    .then(res => {
      if(res) {
        this.loading = false;
        this.dialog.close();
      }
    })

    
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

