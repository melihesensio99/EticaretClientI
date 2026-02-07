import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload } from './file-upload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialogs/dialog-module';


@NgModule({
  declarations: [
    FileUpload
  ],
  imports: [
    CommonModule ,
    NgxFileDropModule,
    DialogModule
  ],
  exports : [
     FileUpload
  ]
 
})
export class FileUploadModule { }
