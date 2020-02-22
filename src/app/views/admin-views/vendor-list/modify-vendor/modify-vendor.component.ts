import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CabinetModalComponent } from './cabinet-modal/cabinet-modal.component';
import { GamesModalComponent } from './games-modal/games-modal.component';

@Component({
  selector: 'app-modify-vendor',
  templateUrl: './modify-vendor.component.html',
  styleUrls: ['./modify-vendor.component.scss'],
})
export class ModifyVendorComponent implements OnInit {
  cabinetList = [];
  gamesList = [];
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  async openCabinetModal() {
    const modal = await this.modalController.create({
      component: CabinetModalComponent
    });
    return await modal.present();
  }

  async openGamesModal() {
    const modal = await this.modalController.create({
      component: GamesModalComponent
    });
    return await modal.present();
  }
}
