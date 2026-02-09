import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';
import { RouterModule } from '@angular/router';



import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ {
        path : "",
        component : Login  
    }])
    
  ]
})
export class LoginModule { }
