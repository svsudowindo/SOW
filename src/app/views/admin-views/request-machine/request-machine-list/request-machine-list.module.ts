import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMachineListRoutingModule } from './request-machine-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestMachineListComponent } from './request-machine-list.component';


@NgModule({
  declarations: [RequestMachineListComponent],
  imports: [
    CommonModule,
    RequestMachineListRoutingModule,
    SharedModule
  ]
})
export class RequestMachineListModule { }
