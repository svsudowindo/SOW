import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMachineListComponent } from './request-machine-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RequestMachineListComponent,
        data: {
          title: 'Request Machine'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMachineListRoutingModule { }
