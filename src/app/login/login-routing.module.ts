import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonorComponent} from "../donor-management/donor/donor.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
