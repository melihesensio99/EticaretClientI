import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Base, spinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../../../services/common/models/product';
import { Listproducts } from '../../../../contracts/listproducts';
import { Alertify, messageType, PositionType } from '../../../../services/admin/alertify';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List extends Base implements OnInit {

  constructor(spinner: NgxSpinnerService, private product: Product, private alertify: Alertify) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'delete', 'update'];
  dataSource = new MatTableDataSource<Listproducts>();
  @ViewChild(MatPaginator) MatPaginator: MatPaginator;



  pageChanged() {
    this.Getproducts();
  }
  delete(id){
    
  }

  async Getproducts() {
    this.showSpinner(spinnerType.ballCircus);
    const pageIndex = this.MatPaginator ? this.MatPaginator.pageIndex : 0;
    const pageSize = this.MatPaginator ? this.MatPaginator.pageSize : 5;

    const allData: { totalCount: number, products: Listproducts[] } = await this.product.list(
      pageIndex,
      pageSize,
      () => this.hideSpinner(spinnerType.ballCircus),
      (errorMessage) => {
        this.hideSpinner(spinnerType.ballCircus);
        this.alertify.message(errorMessage, {
          messageType: messageType.Error,
          positionType: PositionType.TopRight,
          delay: 5,
          dismissOthers: true
        });
      }
    );
    this.dataSource = new MatTableDataSource<Listproducts>(allData.products);
      this.MatPaginator.length = allData.totalCount;
   
  }
  ngOnInit(){
    this.Getproducts();
  }
}