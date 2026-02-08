import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/User';
import { Auth } from '../auth';
import { createUser } from '../../../contracts/User/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenDto } from '../../../contracts/TokenDto';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../../iu/custom-toastr';
import { PositionType } from '../../admin/alertify';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService : HttpClientService , private toastr : CustomToastr, private authService: Auth){
  }
  
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
     localStorage.setItem("accessToken" , token.token.accessToken);
     this.authService.identityCheck();
    }
  this.toastr.message("Giriş başarılı." , "Başarılı!" , {
     messageType : ToastTrMessageType.Success,
     positionType : ToastrPosition.TopRight
  })
}
}
