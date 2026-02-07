import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Register } from './register';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [Register],
  imports: [
     ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([ {
        path : "",
        component : Register  
    }],
 )
  ]
})
export class RegisterModule { }
