import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {LoginRequest} from "../login/LoginRequest";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
}
