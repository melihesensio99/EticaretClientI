import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../../services/iu/custom-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base';
import { _isAuthenticated, Auth } from '../../services/common/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth)
  const toastr = inject(CustomToastr)
  const spinner = inject(NgxSpinnerService)


spinner.show(spinnerType.ballNewtonCradle);

  if(!_isAuthenticated) {
   router.navigate(["login"], { queryParams: { returnUrl: state.url } });
   toastr.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastTrMessageType.Warning,
        positionType: ToastrPosition.TopRight
      })
      spinner.hide(spinnerType.ballNewtonCradle);
      return false;
    }

  spinner.hide(spinnerType.ballNewtonCradle);
    return true;
  }
