import { NgModule } from '@angular/core';

// Custom Directives
import { CommonModule } from '@angular/common';
import { MasterModalModule } from '../../modals/master-modal/master-modal.module';
import { AssignVendorModalModule } from '../../modals/assign-vendor-modal/assign-vendor-modal.module';
import { AssignLocationModalModule } from '../../modals/assign-location-modal/assign-location-modal.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MasterModalModule,
    AssignVendorModalModule,
    AssignLocationModalModule
  ],
  exports: [
    MasterModalModule,
    AssignVendorModalModule,
    AssignLocationModalModule
  ]
})
export class CustomModule { }
