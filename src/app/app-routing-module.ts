import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './admin/layout/layout';
import path from 'path/win32';
import { Home } from './iu/components/home/home';
import { authGuard } from './guards/common/auth-guard';

const routes: Routes = [
{ path : "admin" , component : Layout , children : [
{ path: "", redirectTo: "dashboard", pathMatch: "full" },
{path : "dashboard" , loadChildren : () => import("./admin/components/dashboard/dashboard-module").then(m => m.DashboardModule)} ,
{path : "orders" , loadChildren : () => import("./admin/components/orders/orders-module").then(m => m.OrdersModule)},
{path : "customers" , loadChildren : () => import("./admin/components/customers/customers-module").then(m => m.CustomersModule)},
{path : "products" , loadChildren : () => import("./admin/components/products/products-module").then(m => m.ProductsModule), }
]},
{path : "" , component : Home }, 
{path : "products" , loadChildren : () => import("./iu/components/products/products-module").then(m => m.ProductsModule) },
{path : "register" , loadChildren : () => import("./iu/components/register/register-module").then(m => m.RegisterModule )},
{path : "login" , loadChildren : () => import("./iu/components/login/login-module").then(m => m.LoginModule )},
{path : "basket" , loadChildren : () => import("./iu/components/baskets/baskets-module").then(m => m.BasketsModule)}
]  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
