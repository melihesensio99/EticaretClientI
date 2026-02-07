import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client-service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Header } from '../../../admin/layout/components/header/header';
import { Alertify, messageType, PositionType } from '../../admin/alertify';
import { CustomToastr, ToastrPosition, ToastTrMessageType } from '../../iu/custom-toastr';
import { DeleteState, FileUploadDialog } from '../../../dialogs/file-upload-dialog/file-upload-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog-service';


@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  constructor(private httpClient : HttpClientService , private alertify : Alertify , private toastr : CustomToastr , private dialogService : DialogService){}
  public files: NgxFileDropEntry[] ;
  @Input() options : Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData : FormData = new FormData();
    
    for(const file of files){
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((_file: File) => {
        fileData.append(_file.name , _file , file.relativePath)
        });
    }
    

this.dialogService.openDialog( {
   componentType : FileUploadDialog,
   data : DeleteState.Y,
   callback : ()=> {
      this.httpClient.post( {
      controller : this.options.controller,
      action : this.options.action,
       queryString : this.options.querystring,
        headers : new HttpHeaders({ responseType: 'blob' }
        ) 
    }  , fileData).subscribe(result => {
      const message : string ="Dosyalar başarıyla yüklenmiştir."
      if(this.options.IsAdmin)
        this.toastr.message(message , "Başarılı" , {
       positionType : ToastrPosition.BottomRight,
       messageType : ToastTrMessageType.Success
      })
      else
        this.alertify.message(message , {
           messageType : messageType.Success,
           positionType : PositionType.BottomRight, 
           dismissOthers : true,
             delay : 500
        })
    },
   
    (errorResponse : HttpErrorResponse) => {
       const message : string = "Dosyalar yüklenirken bir hatayla karşılaşıldı."
      if(this.options.IsAdmin)
        this.toastr.message(message , "Başarısız" , {
       positionType : ToastrPosition.BottomRight,
       messageType : ToastTrMessageType.Error
      })
      else
        this.alertify.message(message , {
           messageType : messageType.Error,
           positionType : PositionType.BottomRight, 
           dismissOthers : true,
             delay : 500
        })
    });
  }});
}}
     

  export class FileUploadOptions{
    controller? : string;
    action?: string;
    querystring? : string;
    explanation? : string;
    IsAdmin? : boolean = true;
    accept? : string;
  }


