import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../../services/common/models/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../../services/common/auth';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../../base/base';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private userService: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private authService: Auth, 
    private socialAuthService: SocialAuthService,
    private httpClientService : HttpClient,
    private spinner :NgxSpinnerService
  ) {
   this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
console.log(user)  
 this.spinner.show(spinnerType.ballCircus);
await userService.googleLogin(user , () => {
        this.authService.identityCheck(); 
        this.spinner.hide(spinnerType.ballCircus);
        this.router.navigate(["/"]); 
      });
this.spinner.hide(spinnerType.ballCircus);
    }); 
//todo login pagede kayma var onu duzelt sonradan!!!! ayrica burdaki servisler icin ayri bir class acip daha duzenli hale getir !
  }

  async login(userNameOrEmail: string, password: string) {
    this.spinner.show(spinnerType.ballCircus);
  
    await this.userService.login(userNameOrEmail, password);
    this.authService.identityCheck();
     this.spinner.hide(spinnerType.ballCircus);
    
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'];
      if (returnUrl)
        this.router.navigate([returnUrl]);
      else
        this.router.navigate(["/"]);
    });
    this.spinner.hide(spinnerType.ballCircus);
  }

}
