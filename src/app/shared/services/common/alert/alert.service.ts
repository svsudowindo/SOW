import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Utils from '../utils';

export class ButtonModel {
  text: string;
  cssClass?: string;
  haveHandler?: boolean;
  dismissMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  dismissMessage: string;
  constructor(public alertController: AlertController) { }

  // tslint:disable-next-line:max-line-length
  async openAlert(headerValue: string, subHeaderValue: string, messageValue: string, buttonValues: ButtonModel[] = [], keyboardCloseValue = false, backdropDismissValue = false, translucentValue = false): Promise<any> {
    const buttonsArray = this.getButtonsArray(buttonValues);
    const alert = await this.alertController.create({
      header: headerValue,
      subHeader: subHeaderValue,
      message: messageValue,
      buttons: buttonsArray,
      keyboardClose: keyboardCloseValue,
      backdropDismiss: backdropDismissValue,
      translucent: translucentValue
    });

    await alert.present();
    return alert.onDidDismiss().then(res => {
      return res.data = this.dismissMessage;
    });
  }

  private getButtonsArray(buttonValues) {
    const framedButtons = [];
    buttonValues.forEach(element => {
      const obj: any = {};
      if (Utils.isValidInput(element.text)) {
        obj.text = element.text;
      }
      if (Utils.isValidInput(element.cssClass)) {
        obj.cssClass = element.cssClass;
      }
      if (Utils.isValidInput(element.haveHandler)) {
        obj.haveHandler = element.haveHandler;
        if (element.haveHandler) {
          obj.handler = () => {
            this.dismissMessage = element.dismissMessage;
          };
        }
      }
      framedButtons.push(obj);
    });
    return framedButtons;
  }
}
