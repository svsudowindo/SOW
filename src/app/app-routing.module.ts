import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { CanActivateService } from './shared/services/guard-services/can-activate.service';
import { CanActivateChildService } from './shared/services/guard-services/can-activate-child.service';
import { CanLoadService } from './shared/services/guard-services/can-load.service';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  // add the paths which can be used before login
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./views/auth-views/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/auth-views/login/login.module').then(m => m.LoginModule)

      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./views/auth-views/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: '404',
        loadChildren: () => import('./views/auth-views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
      },
      {
        path: 'registration',
        data: {
          self: true
        },
        loadChildren: () => import('./views/auth-views/registration/registration.module').then(m => m.RegistrationModule)
      }
    ]
  },
  // add the paths which can be used post login
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [CanActivateService],
    canActivateChild: [CanActivateChildService], // Use when we want to make a disission to load sub modules or not
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/admin-views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'register-by-super-admin',
        data: {
          self: false,
          title: 'Register'
        },
        loadChildren: () => import('./views/auth-views/registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path: 'vendor-list',
        data: {
          title: 'Vendor'
        },
        loadChildren: () => import('./views/admin-views/vendor-list/vendor-list.module').then(m => m.VendorListModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
