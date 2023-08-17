import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from "./login/login.module";

// Lazy loading the modules. If you don't want lazy loading, import the components directly.
const routes: Routes = [
  {
    path: 'user-administration',
    loadChildren: () => import('./user-administration/user-administration.module').then(m => m.UserAdministrationModule)
  },
  {
    path: 'donor-management',
    loadChildren: () => import('./donor-management/donor-management.module').then(m => m.DonorManagementModule)
  },
  {
    path: '',
    redirectTo: '/user-administration', // or wherever you want the app to redirect by default
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./campaign-management/campaign.module').then(m=> m.CampaignModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
