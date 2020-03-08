import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-vendor-modal',
  templateUrl: './assign-vendor-modal.component.html',
  styleUrls: ['./assign-vendor-modal.component.scss'],
})
export class AssignVendorModalComponent implements OnInit {
  @Input()
  manufacturerList = [];
  constructor(
    public modalCtrl: ModalController,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  public selectedManufacturer(item) {
    console.log(item);
    this.modalCtrl.dismiss({
      'dismissed': false,
      'manufacturerDetails': item
    });
  }
}
