import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home-module';
import { BasketsModule } from './baskets/baskets-module';
import { ProductsModule } from './products/products-module';
import { Register } from './register/register';
import { RegisterModule } from './register/register-module';
import { Login } from './login/login';
import { LoginModule } from './login/login-module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
     ProductsModule,
        BasketsModule,
        HomeModule,
        RegisterModule,
        LoginModule
  ]
})
export class ComponentsModule { }
