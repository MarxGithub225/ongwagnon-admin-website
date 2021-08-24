import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorsComponent } from './modules/administrators/administrators.component';
import { BannerComponent } from './modules/banner/banner.component';
import { CategoryComponent } from './modules/category/category.component';
import { EventComponent } from './modules/event/event.component';
import { HomeComponent } from './modules/home/home.component';
import { OrderComponent } from './modules/order/order.component';
import { CreateproductComponent } from './modules/product/createproduct/createproduct.component';
import { ProductComponent } from './modules/product/product.component';
import { ShopComponent } from './modules/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component:  OrderComponent
  },
  {
    path: 'donations',
    component:  OrderComponent
  },
  {
    path: 'admins',
    component:  AdministratorsComponent
  },
  {
    path: 'blogs',
    component:  ProductComponent
  },
  {
    path: 'events',
    component:  EventComponent
  },
  {
    path: 'add/:id',
    component:  CreateproductComponent
  },
  {
    path: 'members',
    component:  CategoryComponent
  },
  {
    path: 'shop',
    component:  BannerComponent
  },
  {
    path: 'donations',
    component:  OrderComponent
  },
  {
    path: 'orders',
    component:  ShopComponent
  },
  {
    path: '**',
    component: OrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
