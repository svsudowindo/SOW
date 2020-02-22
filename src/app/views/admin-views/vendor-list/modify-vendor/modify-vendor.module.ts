import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyVendorRoutingModule } from './modify-vendor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyVendorComponent } from './modify-vendor.component';
import { CabinetModalComponent } from './cabinet-modal/cabinet-modal.component';
import { GamesModalComponent } from './games-modal/games-modal.component';


@NgModule({
  declarations: [ModifyVendorComponent, CabinetModalComponent, GamesModalComponent],
  imports: [
    CommonModule,
    ModifyVendorRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CabinetModalComponent,
    GamesModalComponent
  ]
})
export class ModifyVendorModule { }
