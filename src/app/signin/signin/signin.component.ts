import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../login/login.service";
import {LoginRequest} from "../../login/LoginRequest";
import {SigninService} from "../signin.service";
import {SigninRequest} from "../SigninRequest";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {


  signinForm = this.fb.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    mobileNumber : ['', Validators.required],
    email : ['', Validators.required]

  });
  constructor(private fb : FormBuilder, private signinService: SigninService) { }

  onSubmit() {

      const firstName = this.signinForm.get('firstName')?.value;
      const lastName = this.signinForm.get('lastName')?.value;
      const mobileNumber = this.signinForm.get('mobileNumber')?.value;
      const email = this.signinForm.get('email')?.value;


    console.log(firstName)
    console.log(lastName)
    console.log(mobileNumber)
    console.log(email)
    // const loginRequest = new LoginRequest(username,password);
    // localStorage.setItem("role","admin")
    const signinRequest = new SigninRequest(firstName,lastName,mobileNumber,email)
    this.signinService.signin(signinRequest)
  }
}
