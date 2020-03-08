import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMachineRoutingModule } from './request-machine-routing.module';
import { RequestMachineComponent } from './request-machine.component';


@NgModule({
  declarations: [RequestMachineComponent],
  imports: [
    CommonModule,
    RequestMachineRoutingModule,
    SharedModule
  ]
})
export class RequestMachineModule { }
