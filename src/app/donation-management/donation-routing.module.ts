import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationComponent} from "./donation/donation.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: DonationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
