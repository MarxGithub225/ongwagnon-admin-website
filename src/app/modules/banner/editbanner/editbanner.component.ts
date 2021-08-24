import { Component, OnInit, Input} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormControl, Validators } from '@angular/forms';

import { bannerState, User } from 'src/assets/config/interfaces';
import { BannerserviceService } from '../services/bannerservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editbanner',
  templateUrl: './editbanner.component.html',
  styleUrls: ['./editbanner.component.scss']
})
export class EditbannerComponent implements OnInit {

  @Input() datas: any;

  moduleState : bannerState

  today = new Date();
  date = new Date();
  tommorow = new Date (this.date.setDate(this.date.getDate() + 1));
  minStartDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); 
  minEndDate = new Date(this.tommorow.getFullYear(), this.tommorow.getMonth(), this.tommorow.getDate()); 

  note = new FormControl('', Validators.required);
  start = new FormControl('', Validators.required);
  end = new FormControl('', Validators.required);

  loading : boolean = false;
  
  
  constructor(
    private moduleService : BannerserviceService,
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

  ngOnInit(): void {

    this.note.reset(this.datas.note);
    this.start.reset(this.convertDate(this.datas.start));
    this.end.reset(this.convertDate(this.datas.end));


    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  createCountry () {
    
      
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

