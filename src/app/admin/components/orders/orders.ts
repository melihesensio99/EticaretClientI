import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, spinnerType } from '../../../base/base';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService  ) {
    super(spinner);
    }
  
  ngOnInit(): void {
    this.showSpinner(spinnerType.ballNewtonCradle);
  }
}
