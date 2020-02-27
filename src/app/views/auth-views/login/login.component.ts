import { LocalStorageEnums } from './../../../shared/constants/localstorage-enums';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CommonRequestService } from '../../../shared/services/http/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { StorageService } from '../../../shared/services/common/storage.service';
import { LoaderService } from '../../../shared/services/common/loader/loader.service';
import { SPINNER_TYPE } from '../../../shared/services/common/loader/spinner-enums';
import { AlertService, ButtonModel } from '../../../shared/services/common/alert/alert.service';
import { BaseClass } from 'src/app/shared/services/common/baseClass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseClass implements OnInit{

  loginForm: FormGroup;
  validationMessages = {
    userName: [
      { type: 'required', message: 'Username is required'}
    ],
    password: [
      { type: 'required', message: 'Password is required'}
    ]
  };
  // tslint:disable-next-line:max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    public injector: Injector,
    private commonRequestService: CommonRequestService,
    private alertService: AlertService,
    private storageService: StorageService
    ) {
    super(injector);
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  openLoader() {
    this.loaderService.showLoader('loading sample 123....', SPINNER_TYPE.DOTS, true, 5000, true, '', true, true, true);
  }

  login() {
    console.log(this.loginForm.value);
    const buttons: ButtonModel[] = [
      {
        text: 'ok'
      }
    ];
    this.commonRequestService.request(RequestEnums.LOGIN, this.loginForm.value).subscribe(res => {
      if (res.errors.length) {
        this.alertService.openAlert('Error', '', res.errors[0], buttons).then(res => {});
      } else {
        console.log(res);
        this.storageService.setLocalStorageItem(LocalStorageEnums.TOKEN, res.data.authToken);
        this.storageService.setLocalStorageItem(LocalStorageEnums.USER_ID, res.data._id);
        this.storageService.setLocalStorageItem(LocalStorageEnums.ROLE_NAME, res.data.role);
        this.router.navigate(['dashboard']);
      }
    });
  }
}
