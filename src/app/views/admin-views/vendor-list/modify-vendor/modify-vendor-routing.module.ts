import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyVendorComponent } from './modify-vendor.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ModifyVendorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyVendorRoutingModule { }
