import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/User';
import { Auth } from '../auth';
import { createUser } from '../../../contracts/User/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenDto } from '../../../contracts/TokenDto';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../../iu/custom-toastr';
import { PositionType } from '../../admin/alertify';
import { SocialUser } from '@abacritt/angularx-social-login';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService : HttpClientService, 
    private toastr : CustomToastr, 
    private authService: Auth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  
  async createUser(user : User){
   const observable : Observable<createUser | User > = this.httpClientService.post<createUser | User>({
       controller : "users", 
    } , user);

   return await firstValueFrom(observable) as createUser;
  }
 async login(userNameOrEmail : string , password : string  ){
   const observable : Observable<any> = this.httpClientService.post< any | TokenDto>({
       controller : "users",
       action : "login"
  } , { userNameOrEmail , password});
  
   const token : TokenDto = await firstValueFrom(observable) as TokenDto;

    if(token){
      if(isPlatformBrowser(this.platformId)) {
         localStorage.setItem("accessToken" , token.token.accessToken);
      }
     this.authService.identityCheck();
    }
  this.toastr.message("Giriş başarılı." , "Başarılı!" , {
     messageType : ToastTrMessageType.Success,
     positionType : ToastrPosition.TopRight
  })
}
async googleLogin(user: SocialUser, callBack: () => void) {
  const observable: Observable<SocialUser | TokenDto> = this.httpClientService.post<SocialUser | TokenDto>({
    controller: "users",
    action: "google-login"
  }, user);

  const tokenResponse: TokenDto = await firstValueFrom(observable) as TokenDto;

  if (tokenResponse) {
    if(isPlatformBrowser(this.platformId)) {
       localStorage.setItem("accessToken", tokenResponse.token.accessToken);
    }
    
    this.toastr.message("Google girişi başarılı.", "Harika!", {
      messageType: ToastTrMessageType.Success,
      positionType: ToastrPosition.TopRight
    });

    callBack(); 
  }
}
}
     
