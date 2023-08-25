import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login/login.component";
import {WelcomePageComponent} from "./welcome-page.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule { }
