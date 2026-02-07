import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Product } from '../../services/common/models/product';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog, DeleteState } from '../../dialogs/delete-dialog/delete-dialog';
import { Alertify } from '../../services/admin/alertify';
import { DialogService } from '../../services/common/dialog-service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: false,
})
export class Delete {

  constructor(private element : ElementRef,private _renderer : Renderer2 , private productService : Product , private spinner : NgxSpinnerService , private dialog : MatDialog , private dialogService : DialogService) 
  { 
const img = this._renderer.createElement('img');
this._renderer.setAttribute(img , 'src' , 'assets/delete.png');
this._renderer.setStyle(img , 'width' , '15px');
this._renderer.setStyle(img , 'height' , '15px');
this._renderer.setStyle(img , 'cursor' , 'pointer');
this._renderer.appendChild(this.element.nativeElement, img);
}


@Input() id : string;
@Output() callBack : EventEmitter<any> = new EventEmitter();
  
@HostListener('click')
 async   onClick(){
  this.dialogService.openDialog({
    componentType : DeleteDialog,
    data : DeleteState.Y,
    callback : ()=> {
     const td: HTMLTableCellElement = this.element.nativeElement;
    this.spinner.show(spinnerType.ballCircus);
    this.productService.delete(this.id);
    $(td.parentElement).fadeOut(500 , () => {
      this.callBack.emit()
    }); 
  }
  })

    
      
  }
 

}
