import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
    this.authService.setLoggedIn(true)
    console.log("ngOnInit", this.authService.isLoggedin())


  }
   raspuns:any

  eroare!:string;

  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
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
      localStorage.setItem("token",<string>loginResponse.accessToken)
      localStorage.setItem("id",String(loginResponse.id))
      localStorage.setItem("roles",JSON.stringify(loginResponse.roles))


      if(loginResponse.firstLogin) {

        this.router.navigate(['/change'], { state: { loginResponse } })
      }else{

        this.router.navigate(['/campaign'])
      }
    },
      error => {
      console.log(error.error)
        this.eroare=error.error
      }
    )



  }


}
