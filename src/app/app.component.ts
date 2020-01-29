import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import master from '../assets/master.json';
import locationMaster from '../assets/location.json';
import { RequestEnums } from './shared/constants/request-enums';
import { CommonRequestService } from './shared/services/http/common-request.service';
import { AlertService, ButtonModel } from './shared/services/common/alert/alert.service';



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
}
