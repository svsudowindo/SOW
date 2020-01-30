import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterModalComponent } from './master-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    MasterModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [
    MasterModalComponent
  ],
  exports: [
    MasterModalComponent
  ]
})
export class MasterModalModule { }
