import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationRoutingModule} from "./donation-routing.module";
import {DonationComponent} from "./donation/donation.component";
import {ConfirmationService} from "primeng/api";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DonationRoutingModule
  ],
  providers:[ConfirmationService]
})
export class DonationModule { }
