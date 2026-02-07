import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/User';
import { createUser } from '../../../contracts/User/create-user';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService : HttpClientService){
  }
  
  async createUser(user : User){
   const observable : Observable<createUser | User > = this.httpClientService.post<createUser | User>({
       controller : "users", 
    } , user);

   return await firstValueFrom(observable) as createUser;
  }
}
