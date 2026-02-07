import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminModule } from './admin/admin-module';
import { IuModule } from './iu/iu-module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideAnimations } from '@angular/platform-browser/animations';
import { Base } from './base/base';
import { Delete } from './directives/admin/delete';
import { DeleteDialog } from './dialogs/delete-dialog/delete-dialog';
import { FileUpload } from './services/common/file-upload/file-upload';
import { FileUploadDialog } from './dialogs/file-upload-dialog/file-upload-dialog';

@NgModule({
  declarations: [
    App,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule , IuModule
    ,ToastrModule.forRoot()
    ,NgxSpinnerModule,
  ],
  providers: [
    { provide : "baseUrl", useValue : "https://localhost:7045/api", multi : true },
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
