import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-master-modal',
  templateUrl: './master-modal.component.html',
  styleUrls: ['./master-modal.component.scss'],
})
export class MasterModalComponent implements OnInit {
  @Input()
  licenseeList: any;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  selectedLicencee(item) {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'slectedItem': item
    })
  }
}
