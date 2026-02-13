import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../services/common/signal-r';
import { Alertify, messageType, PositionType } from '../../../services/admin/alertify';
import { HubUrls } from '../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../constants/receive-functions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(private signalRService: SignalRService, private alertify: Alertify) {}

  ngOnInit() {
    this.signalRService.start(HubUrls.ProductHub);
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, (message) => {
      this.alertify.message(message, {
        messageType: messageType.Success,
        positionType: PositionType.TopRight,
        delay: 5000,
        dismissOthers: true
      });
      console.log("UrunEklendi: ", message);
    }); 
  }
}
