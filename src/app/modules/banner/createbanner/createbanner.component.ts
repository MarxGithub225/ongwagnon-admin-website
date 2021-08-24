import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormControl, Validators } from '@angular/forms';

import { bannerState, User } from 'src/assets/config/interfaces';
import { BannerserviceService } from '../services/bannerservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createbanner',
  templateUrl: './createbanner.component.html',
  styleUrls: ['./createbanner.component.scss']
})
export class CreatebannerComponent implements OnInit {

  moduleState : bannerState

  today = new Date();
  date = new Date();
  tommorow = new Date (this.date.setDate(this.date.getDate() + 1));
  minStartDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); 
  minEndDate = new Date(this.tommorow.getFullYear(), this.tommorow.getMonth(), this.tommorow.getDate()); 

  price = new FormControl('', Validators.required);
  note = new FormControl('', Validators.required);
  start = new FormControl('', Validators.required);
  end = new FormControl('', Validators.required);

  loading : boolean = false;
  
  bannersData : any[] = [];

  public image : string =  null;

  imageChangedEvent: any;
  croppedImage: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.image = reader.result as string;
      
      };
    
    }
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded () {

  }
  cropperReady () {

  }
  loadImageFailed () {

  }

  setBanner = () =>{
    this.image = this.croppedImage;
    this.imageChangedEvent = null;
  }

  uploadFile = () =>{
    let element: HTMLElement = document.getElementById('imageInput') as HTMLElement;
    element.click();
  }

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

  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.banners && this.moduleState.banners.length > 0) {
        this.bannersData = this.moduleState.banners
      }
    })
  }


  createCountry () {
    if(this.note.invalid ||
      this.price.invalid 
      ) {
        this.note.markAsTouched();
        this.price.markAsTouched();
        return;
      }

      if (!this.image) {
        this.errorMessage('Veuillez ajouter une image !');
        return;
      }


      const countryData = {
        libelle : this.note.value,
        link : this.image,
        price : this.price.value,
        date: new Date().getTime()
      }
      
      this.moduleService.saveBanner(countryData)
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
