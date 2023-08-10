import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorComponent } from './donor/donor.component';

const routes: Routes = [
  {
    path: '',
    component: DonorComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DonorManagementRoutingModule { }
