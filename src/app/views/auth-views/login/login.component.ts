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
    username: [
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
    public injector: Injector
    ) {
    super(injector);
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }


  openLoader() {
    this.loaderService.showLoader('loading sample 123....', SPINNER_TYPE.DOTS, true, 5000, true, '', true, true, true);
  }
}
