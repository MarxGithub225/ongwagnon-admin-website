import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImageCroppedEvent } from 'ngx-image-cropper';


import { productState, categoryState} from 'src/assets/config/interfaces';
import { ProductserviceService } from '../services/productservice.service';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryserviceService } from '../../category/services/categoryservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class CreateproductComponent implements OnInit {

  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  subcategory = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  promo = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  
  // EVENTS
  address = new FormControl('', Validators.required);
  
  subcategories : any[] =  [];
  subcategoriesDatas: any[];

  public images  = [];

  isChecked = false
  
  imageChangedEvent: any;
  croppedImage: any;


  

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
  
  id: any

  constructor(
    private moduleService : ProductserviceService,
    private categoryModuleService : CategoryserviceService,
    private snack: MatSnackBar,
    private router: Router,
    private activate: ActivatedRoute
  ) {

    this.id = activate.snapshot.paramMap.get('id');
   }

  


  
  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.products && this.moduleState.products.length > 0) {
        this.productsData = this.moduleState.products
      }
    })


    // this.categoryModuleService.init()
    this.categoryModuleService.stateObservable.subscribe(state => {
      this.categoryModuleState = state;

      if(this.categoryModuleState.subacetgories && this.categoryModuleState.subacetgories.length > 0) {
        this.subcategories = this.categoryModuleState.subacetgories
        
        if(this.categoryModuleState.categories && this.categoryModuleState.categories.length > 0) {
          this.subcategory.reset(this.categoryModuleState.categories[0].reference)
          this.checkSubcategory(this.categoryModuleState.categories[0].reference)
        }
      }
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  checkSubcategory (event) {

    this.subcategoriesDatas =  this.isObject(event) ? this.subcategories.filter(cat => cat.category === event.value): this.subcategories.filter(cat => cat.category === event);
    this.subcategory.reset(this.subcategoriesDatas[0].id)
  }
  

  isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

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

      if (this.images.length === 0) {
        this.errorMessage('Veuillez ajouter une image !');
        return;
      }

      const countryData = {
        title: this.title.value,
        description: this.description.value,
        state: 1,
        views: 0,
        date: Number(this.id) === 0 ? new Date().getTime() : new Date(this.date.value).getTime(),
        saveon: new Date().getTime(),
        type: Number(this.id)
      }
      
      
      this.moduleService.saveProduct(countryData)
          .then((res: any) => {
            if(res.status) {

              this.images.forEach(img => {
                const imageData = {
                  link : img,
                  blog : res.data.insertId
                }
                this.moduleService.saveImages(imageData)
                .then(resData => {
                  this.moduleService.init()
                  if(resData) {
                    if(Number(this.id) === 0)
                    this.router.navigateByUrl('blogs');
                    else
                    this.router.navigateByUrl('events');
                  }
                })
              })
              
            }
          })

      
  }

  createEvent() {
    if(this.title.invalid ||
       this.date.invalid ||
       this.address.invalid ||
       this.description.invalid 
      ) {
        this.title.markAsTouched();
        this.date.markAsTouched();
        this.title.markAsTouched();
        this.description.markAsTouched();
        return;
      }

     

      const countryData = {
        label: this.title.value,
        address: this.address.value,
        description: this.description.value,
        date: new Date(this.date.value).getTime()
      }
      
      
      this.moduleService.saveEvent(countryData)
          .then((res: any) => {
            if(res) {
              this.router.navigateByUrl('events');
            }
          })

      
  }
}


