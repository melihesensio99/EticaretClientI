import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../iu/custom-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from '../../base/base';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr : CustomToastr ,
    private spinner : NgxSpinnerService
   ){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show(spinnerType.ballCircus)

   return next.handle(req).pipe(
    catchError((error:HttpErrorResponse) => {
        switch (error.status) {
        case HttpStatusCode.Unauthorized:
                this.toastr.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
                  messageType: ToastTrMessageType.Warning,
                  positionType: ToastrPosition.TopRight
                });
                break
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastTrMessageType.Warning,
            positionType: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastr.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
            messageType: ToastTrMessageType.Warning,
            positionType: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastr.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastTrMessageType.Warning,
            positionType: ToastrPosition.BottomFullWidth
          });
          break;
        default:
            console.log("HttpErrorHandlerInterceptor: Caught error status " + error.status); 
            this.toastr.message("Beklenmeyen bir hata meydana geldi!", "Hata!", {
              messageType: ToastTrMessageType.Warning,
              positionType: ToastrPosition.TopRight
            });
          break;
        }
        this.spinner.hide(spinnerType.ballCircus);

        return throwError(() => error);
     
    })
   );
  }
}