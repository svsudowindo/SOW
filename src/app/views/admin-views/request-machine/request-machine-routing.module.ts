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
      },
      {
        path: 'list',
        loadChildren: () => import('./request-machine-list/request-machine-list.module').then(m => m.RequestMachineListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMachineRoutingModule { }
