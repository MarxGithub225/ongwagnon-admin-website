//MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// ANIMATION
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CCOKIES
import { CookieService } from 'ngx-cookie-service';

//TEXT EDITOR
import { AngularEditorModule } from '@kolkov/angular-editor';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// CROPPER
import { ImageCropperModule } from 'ngx-image-cropper';

// MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
//Local
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules//authentication/components/login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { PassforgotComponent } from './modules//authentication/components/passforgot/passforgot.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProfilsideComponent } from './shared/navbar/components/profilside/profilside.component';
import { MobilesideComponent } from './shared/navbar/components/mobileside/mobileside.component';
import { ModalComponent } from './shared/modal/modal.component';
import { BottomsheetComponent } from './shared/bottomsheet/bottomsheet.component';
import { AdministratorsComponent } from './modules/administrators/administrators.component';
import { CreateadministratorComponent } from './modules/administrators/createadministrator/createadministrator.component';
import { DeleteadministratorComponent } from './modules/administrators/deleteadministrator/deleteadministrator.component';
import { EditadministratorComponent } from './modules/administrators/editadministrator/editadministrator.component';
import { ProductComponent } from './modules/product/product.component';
import { CreateproductComponent } from './modules/product/createproduct/createproduct.component';
import { EditproductComponent } from './modules/product/editproduct/editproduct.component';
import { DeleteproductComponent } from './modules/product/deleteproduct/deleteproduct.component';
import { CategoryComponent } from './modules/category/category.component';
import { CreatecategoryComponent } from './modules/category/createcategory/createcategory.component';
import { CreatesubcategoryComponent } from './modules/category/createsubcategory/createsubcategory.component';
import { DeletesubcategoryComponent } from './modules/category/deletesubcategory/deletesubcategory.component';
import { DeletecategoryComponent } from './modules/category/deletecategory/deletecategory.component';
import { BannerComponent } from './modules/banner/banner.component';
import { CreatebannerComponent } from './modules/banner/createbanner/createbanner.component';
import { EditbannerComponent } from './modules/banner/editbanner/editbanner.component';
import { DeletebannerComponent } from './modules/banner/deletebanner/deletebanner.component';
import { OrderComponent } from './modules/order/order.component';
import { EventComponent } from './modules/event/event.component';
import { CreateeventComponent } from './modules/event/createevent/createevent.component';
import { EditeventComponent } from './modules/event/editevent/editevent.component';
import { DeleteeventComponent } from './modules/event/deleteevent/deleteevent.component';
import { ShopComponent } from './modules/shop/shop.component';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    AuthenticationComponent,
    PassforgotComponent,
    NavbarComponent,
    ProfilsideComponent,
    MobilesideComponent,
    ModalComponent,
    BottomsheetComponent,
    AdministratorsComponent,
    CreateadministratorComponent,
    DeleteadministratorComponent,
    EditadministratorComponent,
    ProductComponent,
    CreateproductComponent,
    EditproductComponent,
    DeleteproductComponent,
    CategoryComponent,
    CreatecategoryComponent,
    CreatesubcategoryComponent,
    DeletesubcategoryComponent,
    DeletecategoryComponent,
    BannerComponent,
    CreatebannerComponent,
    EditbannerComponent,
    DeletebannerComponent,
    OrderComponent,
    EventComponent,
    CreateeventComponent,
    EditeventComponent,
    DeleteeventComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    AngularEditorModule,
    ImageCropperModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    {provide: LOCALE_ID, useValue: 'fr' },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
