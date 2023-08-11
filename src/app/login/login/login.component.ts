import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../LoginRequest";
import {LoginService} from "../login.service";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {

  }




  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
  });
  constructor(private fb : FormBuilder, private loginService: LoginService) { }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(username)
    console.log(password)
    const loginRequest = new LoginRequest(username,password);
    localStorage.setItem("role","admin")
    this.loginService.login(loginRequest)
  }
}
