import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorListRoutingModule } from './vendor-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorListComponent } from './vendor-list.component';


@NgModule({
  declarations: [VendorListComponent],
  imports: [
    CommonModule,
    VendorListRoutingModule,
    SharedModule
  ]
})
export class VendorListModule { }
