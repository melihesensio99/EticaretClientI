import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../../services/common/models/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../../services/common/auth';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    private httpClientService : HttpClient
  ) {
   this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
console.log(user)  
await userService.googleLogin(user , () => {
        this.authService.identityCheck(); 
        this.router.navigate(["/"]); 
      });
    }); 

  }

  async login(userNameOrEmail: string, password: string) {
    await this.userService.login(userNameOrEmail, password);
    this.authService.identityCheck();
    
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'];
      if (returnUrl)
        this.router.navigate([returnUrl]);
      else
        this.router.navigate(["/"]);
    });
  }

}
