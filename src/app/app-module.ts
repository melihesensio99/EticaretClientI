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
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule, SOCIAL_AUTH_CONFIG } from '@abacritt/angularx-social-login';
import { Login } from './iu/components/login/login';
import { HttpErrorHandlerInterceptor } from './services/common/http-error-handler-interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Login
  ],
 imports: [
  BrowserModule,
  GoogleSigninButtonModule,
  AppRoutingModule,
  AdminModule,
  IuModule,
  ToastrModule.forRoot(),
  NgxSpinnerModule,
  JwtModule.forRoot({
    config: {
      tokenGetter: () => localStorage.getItem("accessToken"),
      allowedDomains: ["localhost:7045"]
    }
  }),
  SocialLoginModule
],
  providers: [
    { provide : "baseUrl", useValue : "https://localhost:7045/api", multi : true },
 {
      provide: SOCIAL_AUTH_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("564293114298-af3241aafm5bdc49cl7comtncn5dnvhh.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }, {
         provide: HTTP_INTERCEPTORS, 
         useClass: HttpErrorHandlerInterceptor, 
         multi: true
      },



    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
