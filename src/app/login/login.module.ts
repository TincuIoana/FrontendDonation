import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from "./login-routing.module";
import {NgxCaptchaModule} from "ngx-captcha";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgxCaptchaModule  ],


})
export class LoginModule { }
