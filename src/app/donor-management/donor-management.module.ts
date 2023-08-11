import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorComponent } from './donor/donor.component';
import { DonorManagementRoutingModule } from './donor-management-routing.module';



@NgModule({
  declarations: [
    DonorComponent
  ],
  imports: [
    CommonModule,
    DonorManagementRoutingModule
  ]
})
export class DonorManagementModule { }
