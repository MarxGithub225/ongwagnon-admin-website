import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImageCroppedEvent } from 'ngx-image-cropper';


import { productState, categoryState} from 'src/assets/config/interfaces';
import { ProductserviceService } from '../services/productservice.service';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryserviceService } from '../../category/services/categoryservice.service';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  @Input() datas: any;
  
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  subcategory = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  promo = new FormControl('', Validators.required);
  
  subcategories : any[] =  [];
  subcategoriesDatas: any[];

  public images  = [];

  isChecked = false
  
  imageChangedEvent: any;
  croppedImage: any;

  addPromo = false;

  today = new Date();
  date = new Date();
  tommorow = new Date (this.date.setDate(this.date.getDate() + 3));
  minStartDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); 
  minEndDate = new Date(this.tommorow.getFullYear(), this.tommorow.getMonth(), this.tommorow.getDate()); 
  start = new FormControl(null, Validators.required);
  end = new FormControl(null, Validators.required);

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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

  pushImage = () =>{
    this.images.push(this.croppedImage);
    this.imageChangedEvent = null;
  }
  removeImage = (ev)=> {
    for(let [index,v] of this.images.entries()){
      if(v===ev){
        this.images.splice(index,1);
      }
    }
  }

  uploadFile = () =>{
    let element: HTMLElement = document.getElementById('imageInput') as HTMLElement;
    element.click();
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

  errMessage : string = null;
  moduleState : productState;
  categoryModuleState: categoryState;

  productsData : any[] = [];
   
  categoriesData : any[] = [];
  imagesData : any[] = [];
  

  constructor(
    private moduleService : ProductserviceService,
    private categoryModuleService : CategoryserviceService,
    private snack: MatSnackBar,
    private router: Router,
    public dialog: MatDialogRef<ModalComponent>,
  ) { }

  
  convertDate (initDate) {
    const date = new Date(Number(initDate));
    const Day = String(date.getDate()).padStart(2, '0');
    const Month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const Year = date.getFullYear();

    return  (Year + '-' + Month + '-' + Day);
  }

  ngOnInit(): void {

    

    this.imagesData = this.datas.images
    this.title.reset(this.datas.title);
    this.description.reset(this.datas.description);
    

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      
    })


    // this.categoryModuleService.init()
    this.categoryModuleService.stateObservable.subscribe(state => {
      this.categoryModuleState = state;

      if(this.categoryModuleState.subacetgories && this.categoryModuleState.subacetgories.length > 0) {
        this.subcategories = this.categoryModuleState.subacetgories
        
        if(this.categoryModuleState.categories && this.categoryModuleState.categories.length > 0) {
          this.subcategory.reset(this.datas.category)

          this.filterResetData (this.categoryModuleState.subacetgories, this.categoryModuleState.categories)
        }
      }
    })
  }


  filterResetData (souscat, categories) {
    this.category.reset(souscat.filter(cat => cat.id === this.datas.category )[0].category)
    this.checkSubcategory(
      categories.filter(cat => cat.id === this.category.value)[0].id
      
    )
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  checkSubcategory (event) {

    this.subcategoriesDatas =  event.value ? this.subcategories.filter(cat => cat.category === event.value): this.subcategories.filter(cat => cat.category === event);
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

  createCountry () {
    if(this.title.invalid 
      ) {
        this.title.markAsTouched();
        return;
    }

      if(
        this.description.invalid
      ) {
        this.errorMessage("Veuillez ajouter la description de l\'article");
  
        return;
      }

     

      const countryData = {
        ...this.datas,
        title: this.title.value,
        description: this.description.value
      }

      

      this.moduleService.editProduct(countryData)
        .then((res: any) => {
          
          if(res && this.images.length) {
            this.images.forEach(img => {
              const imageData = {
                link : img,
                blog : this.datas.id
              }
              this.moduleService.saveImages(imageData)
              .then(resData => {
                this.moduleService.init()
                this.dialog.close()
              })
            })

          }
          else {

            this.dialog.close()

          }
        })

      
  }


  deleteImage (img) {
    this.moduleService.deleteImage (img)
    .then(res => {
      if(res && res === true) {
        this.imagesData.forEach(data => {
          if(data.id === img.id) {
            this.imagesData = this.imagesData.filter(image => image.id !== img.id)
          }
        })
      }
    })
  }

  
}