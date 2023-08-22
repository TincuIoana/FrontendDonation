import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Role_guards} from "./util/role_guards";

// Lazy loading the modules. If you don't want lazy loading, import the components directly.
const routes: Routes = [
  {
    path: 'user-administration',
    loadChildren: () => import('./user-administration/user-administration.module').then(m => m.UserAdministrationModule),
    canActivate: [Role_guards],
    data:{
      roles:'ROLE_ADM'
    }
  },
  {
    path: 'donor-management',
    loadChildren: () => import('./donor-management/donor-management.module').then(m => m.DonorManagementModule)
  },
  {
    path: '',
    redirectTo: '/login', // or wherever you want the app to redirect by default
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'roles-dialog',
    loadChildren: () => import('./roles-dialog/roles-dialog.module').then(m => m.RolesDialogModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./campaign-management/campaign.module').then(m=> m.CampaignModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then(m=> m.LogoutModule)
  },
  {
    path: 'change',
    loadChildren: () => import('./change-password/change.module').then(m=> m.ChangeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
