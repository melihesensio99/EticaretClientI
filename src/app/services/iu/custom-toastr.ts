import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastr {
  constructor(private toastr: ToastrService) {}
  message(message : string  ,  title? : string , toastrOptions? : Partial <ToastrOptions> ) {
    this.toastr[toastrOptions.messageType](message,title, { positionClass: toastrOptions.positionType } );
  }
}
export class ToastrOptions
{ 
  messageType: ToastTrMessageType;
  positionType: ToastrPosition;

}


export enum ToastTrMessageType{ 
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning"
}
export enum ToastrPosition{
  TopRight = "toast-top-right",
  TopLeft = "toast-top-left",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}
