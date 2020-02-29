import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonHttpService } from './../../../../shared/services/http/common-http.service';
import { CommonRequestService } from './../../../../shared/services/http/common-request.service';
import { Router } from '@angular/router';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CabinetModalComponent } from './cabinet-modal/cabinet-modal.component';
import { GamesModalComponent } from './games-modal/games-modal.component';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';

@Component({
  selector: 'app-modify-vendor',
  templateUrl: './modify-vendor.component.html',
  styleUrls: ['./modify-vendor.component.scss'],
})
export class ModifyVendorComponent extends BaseClass {
  cabinetList = [];
  gamesList = [];
  vendorForm: FormGroup;
  validationMessages = {
    name: [
      {type: 'required', message: 'Manufacturer Name is required'}
    ],
    email: [
      {type: 'required', message: 'Manufacturer email is required'},
      {type: 'pattern', message: 'Manufacturer email should be valid'}
    ]
  };
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public injector: Injector,
    private router: Router,
    private commonHttpService: CommonRequestService,
    private navController: NavController
  ) {
    super(injector);
  }

  ionViewDidEnter() {
    this.createVendor();
  }

  private createVendor() {
    this.vendorForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)])],
      cabinets: [[]],
      games: [[]]
    });
  }

  async openCabinetModal() {
    const modal = await this.modalController.create({
      component: CabinetModalComponent
    });
    modal.onDidDismiss().then(res => {
      this.vendorForm.get('cabinets').setValue(res.data);
    });
    return await modal.present();
  }

  async openGamesModal() {
    const modal = await this.modalController.create({
      component: GamesModalComponent
    });
    modal.onDidDismiss().then(res => {
      this.vendorForm.get('games').setValue(res.data);
    });
    return await modal.present();
  }

  saveVendor() {
    this.commonHttpService.request(RequestEnums.POST_MANUFACTURERS, this.vendorForm.value).subscribe(res => {
      console.log(res);
      if (res.errors.length > 0) {
        // error
      } else {
        this.router.navigate(['vendor-list']);
      }
    });
  }
}
