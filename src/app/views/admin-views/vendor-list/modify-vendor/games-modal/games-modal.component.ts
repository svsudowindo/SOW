import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { BaseClass } from 'src/app/shared/services/common/baseClass';

@Component({
  selector: 'app-games-modal',
  templateUrl: './games-modal.component.html',
  styleUrls: ['./games-modal.component.scss'],
})
export class GamesModalComponent extends BaseClass implements OnInit {
  @Input() gameList = [];
  @Input() isEditable;
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
      description: [''],
      _id: ['']
    });
  }
  dismissModal() {
    this.modalController.dismiss([]);
  }

  saveModal() {
    this.modalController.dismiss(this.gameList);
  }

  addGame() {
    const index = this.gameList.findIndex(res => res._id === this.gameForm.value._id);
    if (index === -1) {
      this.gameList.push(this.gameForm.value);
    } else {
      this.gameList[index] = this.gameForm.value;
    }
    this.gameForm.patchValue({
      name: '',
      description: '',
      _id: ''
    });
  }

  gameSelected(game) {
    this.gameForm.patchValue(game);
  }
}
