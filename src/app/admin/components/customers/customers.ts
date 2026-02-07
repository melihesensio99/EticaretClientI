import { Component, OnInit } from '@angular/core';
import { Base, spinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService  ) {
    super(spinner);
    }
  ngOnInit(): void {
    this.showSpinner( spinnerType.ballZigZagDeflect);
  }
  }