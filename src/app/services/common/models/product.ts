import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import {CreateProduct } from '../../../contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { List } from '../../../admin/components/products/list/list';
import { Listproducts } from '../../../contracts/listproducts';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private httpClientService: HttpClientService) {}

  create(product : CreateProduct ,successCallBack : ()=> void  , errorCallBack?: (errorMessage: string) => void)
  {
    this.httpClientService.post({
      controller: "product",
    },  product)
    .subscribe(result => {
      successCallBack();
    } , (errorResponse: HttpErrorResponse) => { 
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
                message += `${_v}<br>`; 
            });
        });
        errorCallBack(message); 
    });
}
async list(page : number = 0 , size : number = 5 , successCallBack : ()=> void  , errorCallBack?: (errorMessage: string) => void) : Promise<{totalCount : number, products : Listproducts[]}>
{ const dataPromise : Promise<{totalCount : number, products : Listproducts[]}> = this.httpClientService.get<{totalCount : number, products : Listproducts[]}>({
    controller : "product"
    , queryString : `page=${page}&size=${size}`
  }).toPromise();
  dataPromise.then(d => successCallBack())
  .catch((errorResponse : HttpErrorResponse) => { errorCallBack(errorResponse.message); });
  return await dataPromise;
} 


async delete(id : string){
  var deletedObsarvable : Observable<any>= this.httpClientService.delete({
     controller : "product"
  } , id)
  var a = await firstValueFrom(deletedObsarvable);
}
}

