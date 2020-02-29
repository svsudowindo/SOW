import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from 'src/app/shared/services/common/baseClass';

@Component({
  selector: 'app-games-modal',
  templateUrl: './games-modal.component.html',
  styleUrls: ['./games-modal.component.scss'],
})
export class GamesModalComponent extends BaseClass implements OnInit {
  gameList = [];
  gameForm: FormGroup;
  validationMessages = {
    name: [
      {type: 'required', message: 'Game Name is Required'}
    ]
  };
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.gameFormInit();
  }

  gameFormInit() {
    this.gameForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['']
    });
  }
  dismissModal() {
    this.modalController.dismiss([]);
  }

  saveModal() {
    this.modalController.dismiss(this.gameList);
  }

  addGame() {
    this.gameList.push(this.gameForm.value);
    this.gameForm.patchValue({
      name: '',
      description: ''
    });
  }
}
