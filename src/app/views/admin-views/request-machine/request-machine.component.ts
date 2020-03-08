import { Router } from '@angular/router';
import { AlertService, ButtonModel } from 'src/app/shared/services/common/alert/alert.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { AssignLocationModalComponent } from './../../../shared/modals/assign-location-modal/assign-location-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestEnums } from './../../../shared/constants/request-enums';
import { LoaderService } from './../../../shared/services/common/loader/loader.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AssignVendorModalComponent } from 'src/app/shared/modals/assign-vendor-modal/assign-vendor-modal.component';

@Component({
  selector: 'app-request-machine',
  templateUrl: './request-machine.component.html',
  styleUrls: ['./request-machine.component.scss'],
})
export class RequestMachineComponent implements OnInit {

  manufacturerList = [];
  manufacturerDetails: any;
  gamesList = [];
  cabinetList = [];
  billAcceptorList = [];
  requestForm: FormGroup;
  emptyObj = {
    name: '',
    _id: ''
  };
  locationList = [];
  constructor(
    private modalController: ModalController,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router) {
    this.initRequestForm();
    this.getManufacturers();
    this.getLocationList();
  }

  private initRequestForm() {
    this.requestForm = this.formBuilder.group({
      manufacturer: this.formBuilder.group({
        name: [''],
        _id: ['']
      }),
      cabinet: this.formBuilder.group({
        name: [''],
        _id: []
      }),
      billAcceptor: this.formBuilder.group({
        name: [''],
        _id: ['']
      }),
      game: this.formBuilder.group({
        name: [''],
        _id: ['']
      }),
      location: this.formBuilder.group({
        businessName: [''],
        _id: ['']
      })
    });
  }

  private getLocationList() {
    this.commonRequestService.request(RequestEnums.GET_LOCATION_MASTER).subscribe(res => {
      this.locationList = res.data;
      console.log(this.locationList);
    });
  }
  private getManufacturers() {
    this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.GET_MANUFACTURERS).subscribe(res => {
      console.log(res);
      this.loaderService.dissmissLoading();
      if (res && res.data) {
        this.manufacturerList = res.data;
      } else {
        // error
      }
    });
  }

  ngOnInit() {}

  public async openManufacturerModal() {
      const modal = await this.modalController.create({
        component: AssignVendorModalComponent,
        componentProps: {
          manufacturerList: this.manufacturerList
        }
      });
      modal.onDidDismiss().then(res => {
        console.log(res);
        if (!res.data.dismissed) {
          console.log(res.data.manufacturerDetails);
          this.manufacturerDetails = res.data.manufacturerDetails;
          this.requestForm.get('manufacturer').patchValue(this.manufacturerDetails);
          this.emptyBillAcceptor();
          this.emptyCabinet();
          this.emptyGame();
          this.cabinetList = this.manufacturerDetails.cabinets;
          this.gamesList = this.manufacturerDetails.games;
        }
      });
      return await modal.present();
    }
  public cabinetChanged(isFromBillAcceptor = false) {
    const cabinetID = this.requestForm.get('cabinet').get('_id').value;
    const index = this.cabinetList.findIndex(obj => obj._id === cabinetID);
    if (!isFromBillAcceptor) {
      this.emptyBillAcceptor();
    }
    if (index !== -1) {
      this.requestForm.get('cabinet').patchValue(this.cabinetList[index]);
      this.billAcceptorList = this.cabinetList[index].billAcceptor;
      if (isFromBillAcceptor) {
        this.billAcceptorChange(this.cabinetList[index]);
      }
    }
  }

  public billAcceptorChange(cabinet) {
    const billAcceptorID = this.requestForm.get('billAcceptor').get('_id').value;
    const index = cabinet.billAcceptor.findIndex(obj => obj._id === billAcceptorID);
    if (index !== -1) {
      this.requestForm.get('billAcceptor').patchValue(cabinet.billAcceptor[index]);
    }
  }

  public async openGameModal() {
    const modal = await this.modalController.create({
      component: AssignVendorModalComponent,
      componentProps: {
        manufacturerList: this.gamesList
      }
    });
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (!res.data.dismissed) {
        console.log(res.data.manufacturerDetails);
        this.manufacturerDetails = res.data.manufacturerDetails;
        this.requestForm.get('game').patchValue(this.manufacturerDetails);
      }
    });
    return await modal.present();
  }

  public async openLocationsModal() {
    const modal = await this.modalController.create({
      component: AssignLocationModalComponent,
      componentProps: {
        locationList: this.locationList
      }
    });
    modal.onDidDismiss().then(res => {
      if (!res.data.dismissed) {
        console.log(res.data.locationDetails);
        this.requestForm.get('location').patchValue(res.data.locationDetails);
      }
    });
    return await modal.present();
  }

  private emptyCabinet() {
    this.requestForm.get('cabinet').patchValue(this.emptyObj);
  }

  private emptyBillAcceptor() {
    this.requestForm.get('billAcceptor').patchValue(this.emptyObj);
  }

  private emptyGame() {
    this.requestForm.get('game').patchValue(this.emptyObj);
  }

  public requestMachine() {
    const payload = this.requestForm.value;
    // tslint:disable-next-line: forin
    for (const i in payload) {
      console.log(i);
      payload[i]['id'] = payload[i]['_id'];
      delete payload[i]['_id']
    }
    console.log(JSON.stringify(payload));
    const buttons: ButtonModel[] = [
      {
        text: 'Ok',
        dismissMessage: 'ok'
      }
    ];
    this.commonRequestService.request(RequestEnums.POST_MACHINE_REQUEST, payload).subscribe(res =>{
      console.log(res);
      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', res.errors[0], buttons).then(alertRes => {
        });
      } else {
        this.alertService.openAlert('Success', '', 'Request Sent Successfully', buttons).then(alertRes => {
          this.router.navigate(['request-machine', 'list']);
        });
      }
    });
  }
}
