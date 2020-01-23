import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { BaseClass } from 'src/app/shared/services/common/baseClass';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseClass implements OnInit {

  public forgotPasswordForm: FormGroup;
  /**
   * Validation messages showing to end User
   */
  public validationMessages = {
    username: [
      { type: 'required', message: 'Username is required'}
    ],
    securityQuestion: [
      { type: 'required', message: 'Security Question is required'}
    ]
  };
  public showSecurityQuestion = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    public injector: Injector
    ) {
    super(injector);
  }

  ngOnInit() {
    this.initForgotPasswordForm();
  }
  /**
   * Initialize forgot password form
   */
  private initForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      securityQuestion: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * Get securoty question API for a particular User based on Username
   */
  public getSecurityQuestion() {
    this.showSecurityQuestion = true;
  }

  /**
   * Forgot Password API call for a particular user based on username
   */
  public getForgotPassword() {
  }
}
