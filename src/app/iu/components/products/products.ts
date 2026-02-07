import { Component, OnInit } from '@angular/core';
import { Base, spinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html', 
  styleUrl: './products.css',
})
export class Products extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService  ) {
    super(spinner);
    }
  ngOnInit(): void {
    this.showSpinner(spinnerType.ballCircus);
  }
  }      {

}
