import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from './products';
import { RouterModule } from '@angular/router';
import { Create } from './create/create';
import { List } from './list/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatInputModule} from '@angular/material/input';
  import {MatButtonModule} from '@angular/material/button';
  import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Delete } from '../../../directives/admin/delete';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialog } from '../../../dialogs/delete-dialog/delete-dialog';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload-module';
import { DialogModule } from '@angular/cdk/dialog';




@NgModule({
  declarations: [
    Products,
    Create,
    List,
    Delete,
    
    
  ],
  imports: [
    CommonModule,
     RouterModule.forChild([ {
        path : "",
        component : Products
    } ]), MatSidenavModule, MatFormFieldModule, MatInputModule , MatButtonModule , MatTableModule , MatPaginatorModule , MatDialogModule ,FileUploadModule , DialogModule
  ]
})
export class ProductsModule { }
