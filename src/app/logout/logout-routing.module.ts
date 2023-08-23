import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login/login.component";
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
  {
    path: '',
    component: LogoutComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LogoutRoutingModule { }
