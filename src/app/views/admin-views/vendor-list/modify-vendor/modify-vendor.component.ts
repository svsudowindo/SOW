import { AlertService } from './../../../../shared/services/common/alert/alert.service';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonHttpService } from './../../../../shared/services/http/common-http.service';
import { CommonRequestService } from './../../../../shared/services/http/common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CabinetModalComponent } from './cabinet-modal/cabinet-modal.component';
import { GamesModalComponent } from './games-modal/games-modal.component';
import { VALIDATION_PATTERNS } from 'src/app/shared/constants/validation-patterns';
import { ButtonModel } from 'src/app/shared/services/common/alert/alert.service';
import Utils from 'src/app/shared/services/common/utils';

@Component({
  selector: 'app-modify-vendor',
  templateUrl: './modify-vendor.component.html',
  styleUrls: ['./modify-vendor.component.scss'],
})
export class ModifyVendorComponent extends BaseClass {
  cabinetList = [];
  gamesList = [];
  vendorForm: FormGroup;
  vendorID: any;
  vendorDetails: any;
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
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    super(injector);
    this.vendorID = this.activatedRoute.snapshot.params.id;
    this.createVendor();
    if (this.vendorID) {
      this.getVendorDetails();
    }
  }
/**
 * Get vendor details by ID
 */
  private getVendorDetails() {
    console.log(this.vendorID);
    RequestEnums.GET_MANUFACTURER_BY_ID.values[0] = this.vendorID;
    this.commonHttpService.request(RequestEnums.GET_MANUFACTURER_BY_ID).subscribe(res => {
      const buttons: ButtonModel[] = [
        {
          text: 'Ok',
          dismissMessage: 'ok'
        }
      ];

      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', res.message, buttons).then(alertRes => {});
      } else {
        console.log(res.data[0]);
        this.vendorDetails = res.data[0];
        this.cabinetList = res.data[0].cabinets;
        this.gamesList = res.data[0].games;
        this.vendorForm.patchValue(res.data[0]);
      }
    });
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
      component: CabinetModalComponent,
      componentProps: {
        cabinetsList: this.cabinetList,
        isEditable: this.vendorID ? true : false
      }
    });
    modal.onDidDismiss().then(res => {
      this.cabinetList = res.data;
      this.vendorForm.get('cabinets').setValue(res.data);
    });
    return await modal.present();
  }

  async openGamesModal() {
    const modal = await this.modalController.create({
      component: GamesModalComponent,
      componentProps: {
        gameList: this.gamesList,
        isEditable: this.vendorID ? true : false
      }
    });
    modal.onDidDismiss().then(res => {
      this.gamesList = res.data;
      this.vendorForm.get('games').setValue(res.data);
    });
    return await modal.present();
  }

  saveOrUpdateVendor() {
    const url = this.vendorID ? RequestEnums.UPDATE_MANUFACTURER : RequestEnums.POST_MANUFACTURERS;
    console.log(this.vendorForm.value);
    const payload = this.vendorForm.value;
    if (this.vendorID) {
      payload._id = this.vendorID;
    }
    const buttons: ButtonModel[] = [
      {
        text: 'Ok',
        dismissMessage: 'ok'
      }
    ];
    payload.cabinets = payload.cabinets.map(obj => {
      if (!Utils.isValidInput( obj._id)) {
        delete obj._id;
      }
      return obj;
    });
    payload.games = payload.games.map(obj => {
      if (!Utils.isValidInput( obj._id)) {
        delete obj._id;
      }
      return obj;
    });
    this.commonHttpService.request(url, payload).subscribe(res => {
      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', res.message, buttons).then(alertRes => {});
      } else {
        this.alertService.openAlert('Success', '', res.message, buttons).then(alertRes => {
          this.router.navigate(['vendor-list']);
        });
      }
    });
  }
}
