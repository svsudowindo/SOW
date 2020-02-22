import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VendorListComponent
      },
      {
        path: 'create',
        loadChildren: () => import('./modify-vendor/modify-vendor.module').then(m => m.ModifyVendorModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./modify-vendor/modify-vendor.module').then(m => m.ModifyVendorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorListRoutingModule { }
