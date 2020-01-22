import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // constructor(public plt: Platform, public nativeStorage: NativeStorage) {
  //   console.log(plt.is('desktop'));
  // }

  // // set based on platform
  // setLocalStorageItem(key: string, value) {
  //   if (this.plt.is('desktop')) {
  //     this.setDesktopStorage(key, value);
  //   } else {
  //     this.setMobileStorage(key, value);
  //   }
  // }

  // // get based on platform
  // getLocalStorageItem(key) {
  //   if (this.plt.is('desktop')) {
  //     return this.getDesktopStorage(key);
  //   } else {
  //     this.getMobileStorage(key);
  //   }
  // }

  // // remove based on platform

  // deleteLocalStorageItem(keys) {
  //   if (this.plt.is('desktop')) {
  //     this.deleteDesktopStorage(keys);
  //   } else {
  //     this.deleteMobileStorage(keys);
  //   }
  // }


  // // Desktop Storage
  // setDesktopStorage(key, value) {
  //   console.log('desktop');
  //   if (value) {
  //     if (typeof value === 'string') {
  //       localStorage.setItem(key, value);
  //     } else {
  //       localStorage.setItem(key, JSON.stringify(value));
  //     }
  //   }
  // }

  // // if other than desktop application
  // setMobileStorage(key, value) {
  //   console.log('mobile storage');
  //   this.nativeStorage.setItem('app-storage', { key: value })
  //     .then(
  //       () => console.log('Stored item!'),
  //       error => console.error('Error storing item', error)
  //     );
  // }

  // // get Desktop Storage
  // getDesktopStorage(key) {
  //   console.log('get desktop storage');

  //   if (key && localStorage.getItem(key)) {
  //     try {
  //       return JSON.parse(localStorage.getItem(key));
  //     } catch (ex) {
  //       return localStorage.getItem(key);
  //     }
  //   }
  // }

  // // get Other than desktop storage

  // getMobileStorage(key) {
  //   console.log('get mobile storage');

  //   this.nativeStorage.getItem('app-storage')
  //     .then(
  //       data => console.log(data),
  //       error => console.error(error)
  //     );
  // }

  // // remove desktop storage
  // deleteDesktopStorage(keys) {
  //   if (keys instanceof Array) {
  //     for (let i = 0; i < keys.length; i++) {
  //       localStorage.removeItem(keys[i]);
  //     }
  //   } else {
  //     localStorage.removeItem(keys);
  //   }
  // }

  // // remove other than desktop
  // deleteMobileStorage(keys) {
  //   if (keys instanceof Array) {
  //     keys.forEach(element => {
  //       this.nativeStorage.remove('app-storage').then(
  //         data => console.log('remove', data),
  //         error => console.log('error', error)
  //       );
  //     });
  //   } else {
  //     this.nativeStorage.remove('app-storage').then(
  //       data => console.log('remove', data),
  //       error => console.log('error', error)
  //     );
  //   }
  // }
}
