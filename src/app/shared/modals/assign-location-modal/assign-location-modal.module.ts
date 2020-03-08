import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignLocationModalComponent } from './assign-location-modal.component';



@NgModule({
  declarations: [AssignLocationModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AssignLocationModalComponent
  ],
  entryComponents: [
    AssignLocationModalComponent
  ]
})
export class AssignLocationModalModule { }
