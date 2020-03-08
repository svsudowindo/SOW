import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMachineComponent } from './request-machine.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RequestMachineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMachineRoutingModule { }
