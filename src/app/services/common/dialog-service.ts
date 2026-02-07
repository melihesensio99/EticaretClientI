import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog : MatDialog){}
  
  openDialog(DialogParameters : Partial< DialogParameters>): void {
    const dialogRef = this.dialog.open(DialogParameters.componentType, {
      width: DialogParameters.options?.width,
      height :DialogParameters.options?.height,
      data: DialogParameters.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DialogParameters.data) {
        DialogParameters.callback();
      }
    });
  }
}
 
export class DialogParameters{
  componentType : ComponentType<any>;
  data : any;
  callback : () => void;
  options? : Partial<DialogOptions>
}
export class DialogOptions {
  height? : string;
  width? : string;
}
