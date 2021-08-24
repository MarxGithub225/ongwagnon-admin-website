import { Component, OnInit, Input} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormControl, Validators } from '@angular/forms';

import { bannerState, User } from 'src/assets/config/interfaces';
import { BannerserviceService } from '../services/bannerservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletebanner',
  templateUrl: './deletebanner.component.html',
  styleUrls: ['./deletebanner.component.scss']
})
export class DeletebannerComponent implements OnInit {

  @Input() datas: any;
  moduleState : bannerState

  loading : boolean = false;
  
  constructor(
    private moduleService : BannerserviceService,
    public dialog: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;
    })
  }


  deleteBanner () {
    

      this.moduleService.deleteBanner(this.datas)
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
