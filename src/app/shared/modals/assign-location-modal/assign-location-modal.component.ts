import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../../services/common/loader/loader.service';

@Component({
  selector: 'app-assign-location-modal',
  templateUrl: './assign-location-modal.component.html',
  styleUrls: ['./assign-location-modal.component.scss'],
})
export class AssignLocationModalComponent implements OnInit {
  @Input()
  locationList: any;
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
      'locationDetails': item
    });
  }

}
