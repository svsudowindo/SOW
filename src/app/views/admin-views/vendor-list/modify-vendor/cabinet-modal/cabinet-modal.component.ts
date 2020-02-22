import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet-modal',
  templateUrl: './cabinet-modal.component.html',
  styleUrls: ['./cabinet-modal.component.scss'],
})
export class CabinetModalComponent implements OnInit {
  billAcceptorList = [];
  billAcceptor;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addBillAcceptor() {
    this.billAcceptorList.push(this.billAcceptor);
    this.billAcceptor = '';
  }
}
