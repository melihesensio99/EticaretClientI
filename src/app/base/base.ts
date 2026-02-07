import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class Base {
   constructor(private spinner: NgxSpinnerService ) {}
    showSpinner(spinnerNameType: spinnerType){
      this.spinner.show(spinnerNameType);

      setTimeout(() => {
        this.spinner.hide(spinnerNameType);
      },1000);
    }
    hideSpinner(spinnerNameType:spinnerType){  
      this.spinner.hide(spinnerNameType);
    }
  }
   
export enum spinnerType 
{
   ballZigZagDeflect= "s1", 
   ballNewtonCradle= "s2" ,
   ballCircus= "s3",
   ballScaleMultiple= "s4"
}