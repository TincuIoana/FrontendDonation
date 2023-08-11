import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorComponent } from './donor/donor.component';
import { DonorManagementRoutingModule } from './donor-management-routing.module';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    DonorComponent
  ],
  imports: [
    CommonModule,
    DonorManagementRoutingModule,
    TranslateModule
  ]
})
export class DonorManagementModule { }
