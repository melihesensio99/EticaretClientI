import { Component , OnInit } from '@angular/core';
import { Alertify, AlertifyOptions, messageType , PositionType} from '../../services/admin/alertify';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  constructor(private alertify: Alertify) {}

  ngOnInit() {
    this.alertify.message('Layout Component Initialized', new AlertifyOptions());
    }}
