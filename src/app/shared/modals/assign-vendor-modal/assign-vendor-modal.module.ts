import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignVendorModalComponent } from './assign-vendor-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AssignVendorModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AssignVendorModalComponent
  ],
  entryComponents: [
    AssignVendorModalComponent
  ]
})
export class AssignVendorModalModule { }
