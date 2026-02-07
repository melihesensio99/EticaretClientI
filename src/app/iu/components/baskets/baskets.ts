import { Component, OnInit } from '@angular/core';
import { Base, spinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.html',
  styleUrl: './baskets.css',
})
export class Baskets extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService  ) {
    super(spinner);
    }
  ngOnInit(): void {
    this.showSpinner(spinnerType.ballCircus);
  }
  }     