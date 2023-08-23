import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Role_guards} from "./util/role_guards";
import {NotificationComponent} from "./notificationSystem/notification/notification.component";
import {NotificationGuard} from "./util/notification-guard";

// Lazy loading the modules. If you don't want lazy loading, import the components directly.
const routes: Routes = [
  {
    path: 'user-administration',
    loadChildren: () => import('./user-administration/user-administration.module').then(m => m.UserAdministrationModule),
    canActivate: [Role_guards],
    data:{
      permissions:['USER_MANAGEMENT']
    }
  },
  {
    path: 'donor-management',
    loadChildren: () => import('./donor-management/donor-management.module').then(m => m.DonorManagementModule),
    canActivate: [Role_guards],
    data:{
      permissions:['BENEF_MANAGEMENT']
    }
  },
  {
    path: '',
    redirectTo: '/login',
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
    loadChildren: () => import('./campaign-management/campaign.module').then(m=> m.CampaignModule),
    canActivate: [Role_guards],
    data:{
      permissions:['CAMP_MANAGEMENT']
    }
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then(m=> m.LogoutModule)
  },
  {
    path: 'change',
    loadChildren: () => import('./change-password/change.module').then(m=> m.ChangeModule)
  },

  {
    path: 'notifications',
    component: NotificationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
