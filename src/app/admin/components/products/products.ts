import { Component, OnInit } from '@angular/core';
import { Base, spinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client-service';
import { Listproducts } from '../../../contracts/listproducts';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService , private httpClientService : HttpClientService) {
    super(spinner);
    }
   
  
  ngOnInit(): void {
    this.showSpinner(spinnerType.ballCircus);
  }

  get() {
    this.httpClientService.get({
      controller : "test"
    }).subscribe(data => { 
      console.log(data);
    }); 
  }

  put() {
    this.httpClientService.put({
      controller : "test",
    } , {id : "019bb8fa-5661-7777-851c-9a8ebbd0f706", name : "edaorosbu",
      Stock : 500 , Price : 9999
    }).subscribe();
  }
}
