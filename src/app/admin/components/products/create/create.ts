import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../../../services/common/models/product';
import { CreateProduct } from '../../../../contracts/create-product';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, spinnerType } from '../../../../base/base';
import { Alertify, messageType, PositionType } from '../../../../services/admin/alertify';
import { delay } from 'rxjs';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create  extends Base implements OnInit {

  constructor(private productService: Product , spinner: NgxSpinnerService , private alertify : Alertify) {
    super(spinner); }
  
  ngOnInit(): void {
  }

  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
     action : "upload",
      controller : "test",
      explanation : "Resimleri seçiniz.",
      IsAdmin : true,
      accept : ".png , .jpg , .jpeg"
  }

  createProduct(name : HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(spinnerType.ballCircus);
    const createProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);
    this.productService.create(createProduct , () => {
      this.hideSpinner(spinnerType.ballCircus);
     this.alertify.message("Ürün başarıyla oluşturuldu.", { messageType : messageType.Success, positionType : PositionType.BottomRight, delay : 5, dismissOthers : true 
    });
  } , errorMessage => {
      this.alertify.message(errorMessage , { messageType : messageType.Error, positionType : PositionType.TopRight, delay : 5, dismissOthers : true});
    });
}
}