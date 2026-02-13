import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../services/common/models/product';
import { Listproducts } from '../../../../contracts/listproducts';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List  implements OnInit {
  constructor(private productService: Product, private cdr: ChangeDetectorRef) {
  }

  products : Listproducts[] = [];
  async ngOnInit() {
    const data: { totalCount: number, products: Listproducts[] } = await this.productService.list(0, 10, () => {
    }, errorMessage => {
    });
    this.products = data.products;
    this.cdr.detectChanges();
  }
}
