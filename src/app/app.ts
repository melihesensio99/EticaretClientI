import { Component, signal, OnInit } from '@angular/core'; // 1. OnInit'i import et
import { ToastrService } from 'ngx-toastr';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from './services/iu/custom-toastr';
import { PositionType } from './services/admin/alertify';
import { Auth } from './services/common/auth';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App  {  
constructor(public authService : Auth , private toastr : CustomToastr) { 
   authService.identityCheck();
    
}
 signOut(){
  localStorage.removeItem("accessToken");
  this.authService.identityCheck();
  this.toastr.message("Başarıyla çıkış yapıldı" , "Çıkış yapıldı!" , {
    messageType : ToastTrMessageType.Success,
    positionType : ToastrPosition.TopRight
  });
 }
}

