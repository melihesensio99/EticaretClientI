import { Component, OnInit } from '@angular/core';
import { Base, spinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService  ) {
    super(spinner);
    }
  ngOnInit(): void {
    this.showSpinner(spinnerType.ballCircus);
  }
  }     {

}
