import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import master from '../assets/master.json';
import locationMaster from '../assets/location.json';
import rolesMaster from '../assets/roles.json';
import { RequestEnums } from './shared/constants/request-enums';
import { CommonRequestService } from './shared/services/http/common-request.service';
import { AlertService, ButtonModel } from './shared/services/common/alert/alert.service';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private commonRequestService: CommonRequestService,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  uploadLocationMaster() {
    this.commonRequestService.request(RequestEnums.UPLOAD_LOCATION_MASTER, {obj: locationMaster}).subscribe(res => {
      const buttons: ButtonModel[] = [
        {
          text: 'Ok',
          dismissMessage: 'ok'
        }
      ];
      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', res.errors[0], buttons).then(alertRes => {
        });
      } else if (res.status === 200) {
        this.alertService.openAlert('Error', '', 'Successfully uploaded location master data', buttons).then(alertRes => {
        });
      }
    });
  }

   uploadMaster() {
    this.commonRequestService.request(RequestEnums.UPLOAD_MASTER_DATA, {obj: master}).subscribe(res => {
      const buttons: ButtonModel[] = [
        {
          text: 'Ok',
          dismissMessage: 'ok'
        }
      ];
      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', res.errors[0], buttons).then(alertRes => {
        });
      } else if (res.status === 200) {
        this.alertService.openAlert('Error', '', 'Successfully uploaded master data', buttons).then(alertRes => {
        });
      }
    });
  }

  uploadRoles() {
    const buttons: ButtonModel[] = [
      {
        text: 'Ok',
        dismissMessage: 'ok'
      }
    ];
    forkJoin([
      this.commonRequestService.request(RequestEnums.UPLOAD_ROLES, rolesMaster.roles[0]),
      this.commonRequestService.request(RequestEnums.UPLOAD_ROLES, rolesMaster.roles[1]),
      this.commonRequestService.request(RequestEnums.UPLOAD_ROLES, rolesMaster.roles[2]),
      this.commonRequestService.request(RequestEnums.UPLOAD_ROLES, rolesMaster.roles[3])]).subscribe(res => {
      if (res) {
        this.alertService.openAlert('Error', '', 'Successfully Created Roles', buttons).then(alertRes => {
        });
      }
    }, error => {
      console.log(error);
      this.alertService.openAlert('Error', '', 'Error While Creating Roles', buttons).then(alertRes => {});
    });
  }

  /**
   * Used to create Dummy Super admin 
   */
  createSuperAdmin() {
    const obj  = {
      'userName' : 'admin',
      'firstName' : 'my name',
      'lastName' : 'last name',
      'password': 'admin',
      'email' : 'svsudowindo@gmail.com',
      'phoneNumber' : 9542754461.0,
      'licenseeNumber' : '123545',
      'businessName' : 'business name',
      'locationName' : 'location name',
      'storeName' : 'store name ',
      'address' : 'my adress',
      'city' : 'Hyderabad',
      'state' : 'telangana',
      'zipcode' : '500678',
      'role' : 'SUPER_ADMIN'
    };
    const buttons: ButtonModel[] = [
      {
        text: 'Ok',
        dismissMessage: 'ok'
      }
    ];
    this.commonRequestService.request(RequestEnums.REGISTER_USER, obj).subscribe(res => {
      console.log(res);
      if (res.errors.length > 0) {
        this.alertService.openAlert('Error', '', 'Error While Creating Super admin', buttons).then(alertRes => {});
      } else {
        this.alertService.openAlert('Success', '', res.message, buttons).then(alertRes => {});
      }
    });
  }
}
