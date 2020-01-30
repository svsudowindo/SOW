import { NgModule } from '@angular/core';

// Custom Directives
import { CommonModule } from '@angular/common';
import { MasterModalModule } from '../../modals/master-modal/master-modal.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MasterModalModule
  ],
  exports: [
    MasterModalModule
  ]
})
export class CustomModule { }
