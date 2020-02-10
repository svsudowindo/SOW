import { Registration } from './registration.model';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { Router, ActivatedRouteSnapshot, NavigationEnd, RouterEvent } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { ModalController } from '@ionic/angular';
import { MasterModalComponent } from 'src/app/shared/modals/master-modal/master-modal.component';
import Utils from 'src/app/shared/services/common/utils';
import { filter } from 'rxjs/operators';
import { ROLES} from 'src/app/shared/constants/app-properties';
import { AlertService, ButtonModel } from 'src/app/shared/services/common/alert/alert.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends BaseClass implements OnInit {

  registerForm: FormGroup;
  licenseeList = [];
  selectedLicencee: any;
  selectedFromLicenceeList = false;
  isSelfRegister = false;
  ROLES_ENUM = ROLES;
  selectedRole = ROLES.MASTER;
  validationMessages = {
    firstName: [
      { type: 'required', message: 'First Name is required' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Phone Number is required' }
    ],
    // securityQuestion: [
    //   { type: 'required', message: 'Security Question is required' }
    // ],
    // securityAnswer: [
    //   { type: 'required', message: 'Security Answer is required' }
    // ],
    licenseeNumber: [
      { type: 'required', message: 'Licensee Number is required' }
    ],
    businessName: [
      { type: 'required', message: 'Business Name is required' }
    ],
    locationName: [
      { type: 'required', message: 'Location Name is required' }
    ],
    storeName: [
      { type: 'required', message: 'Store Name is required' }
    ],
    city: [
      { type: 'required', message: 'City is required' }
    ],
    state: [
      { type: 'required', message: 'State is required' }
    ],
    zipcode: [
      { type: 'required', message: 'Zipcode is required' }
    ],
  };
  // tslint:disable-next-line:max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    public injector: Injector,
    private commonRequestService: CommonRequestService,
    public modalController: ModalController,
    private alertController: AlertService
  ) {
    super(injector);
    this.router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isSelfRegister = this.router.routerState.root.firstChild.firstChild.snapshot.data.self;
      }
    });
  }

  ngOnInit() {
    this.initLoginForm();
    this.getMasterBasedOnRole();
  }

  initLoginForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      // securityQuestion: [''],
      // securityAnswer: [''],
      licenseeNumber: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])],
      locationName: [''],
      storeName: ['', Validators.compose([Validators.required])],
      address: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])],
    });
  }


  /**
   * Get Master info based on selected role
   */
  getMasterBasedOnRole() {
    let request = RequestEnums.GET_LOCATION_MASTER;
    switch(this.selectedRole) {
      case this.ROLES_ENUM.MASTER: {
        request = RequestEnums.GET_MASTER;
        this.getMasterInfo(request);
        break;
      }
      case this.ROLES_ENUM.LOCATION: {
        this.getMasterInfo(request);
        break;
      }
    }
  }
  /**
   * Get Master Data
   */
  private getMasterInfo(request) {
    this.commonRequestService.request(request).subscribe(res => {
      this.licenseeList = res.data;
    })
  }

  /**
   * Register a user
   */
  register() {
    const postBody = this.registerForm.value;
    postBody['role'] = this.selectedRole;
    const buttons: ButtonModel[] = [
      {
        text: 'OK'
      }
    ];
    this.commonRequestService.request(RequestEnums.REGISTER_USER, this.registerForm.value).subscribe(res => {
      if (res.errors.length > 0) {
        this.alertController.openAlert('Error', '', res.errors[0], buttons);
      } else {
        this.alertController.openAlert('Success', '', this.selectedRole.toLowerCase() + ' Created Successfully', buttons);
      }
    });
  }

  /**
   * Open the licensee Model for selecting the licensee number
   */
  async openLicenseeModal() {
    this.selectedFromLicenceeList = false;
    const modal = await this.modalController.create({
      component: MasterModalComponent,
      componentProps: {
        'licenseeList': this.licenseeList
      }
    });
    modal.present();
    const dismissedData = await modal.onWillDismiss();
    let obj = {
      licenseeNumber: null,
      businessName: '',
      locationName: '',
      storeName: '',
      address: '',
      city: '',
      state: '',
      zipcode: null
    }
    if (Utils.isValidInput(dismissedData.data.slectedItem)) {
      obj = dismissedData.data.slectedItem;
      this.selectedFromLicenceeList = true;
    }
    this.prefillLicenceeDetails(obj);
  }

  /**
   * Fill the fields related to the selected item
   * @param selectedItem The selected Master Item
   */
  prefillLicenceeDetails(selectedItem) {
    this.selectedLicencee = selectedItem;
    this.registerForm.get('licenseeNumber').setValue(selectedItem.licenseeNumber);
    this.registerForm.get('businessName').setValue(selectedItem.businessName);
    this.registerForm.get('locationName').setValue(selectedItem.locationName);
    this.registerForm.get('storeName').setValue(selectedItem.storeName);
    this.registerForm.get('address').setValue(selectedItem.address);
    this.registerForm.get('city').setValue(selectedItem.city);
    this.registerForm.get('state').setValue(selectedItem.state);
    this.registerForm.get('zipcode').setValue(selectedItem.zipcode);
  }
}
