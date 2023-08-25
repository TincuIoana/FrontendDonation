import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../LoginRequest";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.eroare=''
    this.authService.setLoggedIn(false)
    console.log("ngOnInit", this.authService.isLoggedin())


  }
   raspuns:any
  siteKey ='6LfPjccnAAAAABZq4S54-gUpnOnBg5PiaFgKihZA'
  eroare!:string;

  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required],
    // recaptcha: ['', Validators.required]
  });
  constructor(private fb : FormBuilder, private loginService: LoginService, private router: Router, private authService:AuthService) { }


  onSubmit() {
    this.authService.setLoggedIn(true)
    console.log('onSubmit: loggedIn =', this.authService.isLoggedin());

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(username)
    console.log(password)
    const loginRequest = new LoginRequest(username,password);

     this.raspuns = this.loginService.login(loginRequest)
    this.loginService.login(loginRequest).subscribe(loginResponse =>{
      this.loginService.setLoginResponse(loginResponse)
      sessionStorage.setItem("token",<string>loginResponse.accessToken)
      this.loginService.setLoggedIn()


      if(loginResponse.firstLogin) {

        this.router.navigate(['/change'], { state: { loginResponse } })
      }else{

        this.router.navigate(['/campaign'])
      }
    },
      error => {
        this.eroare=error.error
      }
    )



  }



}
