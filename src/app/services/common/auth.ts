import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.identityCheck();
  }

  identityCheck(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token: string | null = localStorage.getItem("accessToken");
      
      let expired: boolean;
      try {
        expired = this.jwtHelper.isTokenExpired(token);
      } catch {
        expired = true;
      }

      _isAuthenticated = token != null && !expired;
      return _isAuthenticated;
    }
    
    return false;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;