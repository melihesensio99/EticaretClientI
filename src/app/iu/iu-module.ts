import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './components/products/products-module';
import { BasketsModule } from './components/baskets/baskets-module';
import { HomeModule } from './components/home/home-module';
import { ComponentsModule } from './components/components-module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
 ComponentsModule,
  ]
})
export class IuModule { }
