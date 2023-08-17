import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login/login.component";
import {RolesDialogComponent} from "./roles-dialog.component";



const routes: Routes = [
  {
    path: '',
    component: RolesDialogComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesDialogRoutingModule { }
