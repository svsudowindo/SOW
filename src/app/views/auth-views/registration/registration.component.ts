import { Registration } from './registration.model';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from 'src/app/shared/constants/request-enums';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends BaseClass implements OnInit {

  registerForm: FormGroup;
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
    securityQuestion: [
      { type: 'required', message: 'Security Question is required' }
    ],
    securityAnswer: [
      { type: 'required', message: 'Security Answer is required' }
    ],
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
    address: [
      { type: 'required', message: 'Address is required' }
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
    private commonRequestService: CommonRequestService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      securityQuestion: ['', Validators.compose([Validators.required])],
      securityAnswer: ['', Validators.compose([Validators.required])],
      licenseeNumber: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])],
      locationName: ['', Validators.compose([Validators.required])],
      storeName: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Register a user
   */
  register() {
    this.commonRequestService.request(RequestEnums.REGISTER_USER, this.registerForm.value).subscribe(res => {
      console.log(res);
    });
  }
}
