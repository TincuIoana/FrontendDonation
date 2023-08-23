import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangeRoutingModule} from "./change-routing.module";
import {LoginComponent} from "../login/login/login.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChangeRoutingModule
  ],
  providers:[LoginComponent]
})
export class ChangeModule { }
