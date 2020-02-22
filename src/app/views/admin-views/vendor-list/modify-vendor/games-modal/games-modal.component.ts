import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-modal',
  templateUrl: './games-modal.component.html',
  styleUrls: ['./games-modal.component.scss'],
})
export class GamesModalComponent implements OnInit {
  gameList = [];

  gameDetails = {
    name: '',
    description: ''
  }
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addGame() {
    this.gameList.push(this.gameDetails);
    this.gameDetails = {
      name: '',
      description: ''
    }
  }
}
