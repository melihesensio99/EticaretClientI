import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class Alertify {
  constructor() {}

  message(message: string , options : AlertifyOptions) {
    alertify.set('notifier','position', options.positionType);
    alertify.set('notifier','delay', options.delay);
    const msj = alertify[options.messageType](message);
    if(options.dismissOthers)
      msj.dissmissOthers();
  }

  dismissAll() {
    alertify.dismissAll();
  }
  

}
export class AlertifyOptions
 { 
messageType: messageType = messageType.Message; 
positionType: PositionType = PositionType.TopRight;
delay: number = 5;
dismissOthers: boolean = false;
  
 }

export enum messageType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Message = "message",
  Notify = "notify" 
}

export enum PositionType {
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  Center = "center"
}
