import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialog } from './file-upload-dialog/file-upload-dialog';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    FileUploadDialog,
    DeleteDialog
  ],
  imports: [
    CommonModule , MatDialogModule
  ]
})
export class DialogModule { }
