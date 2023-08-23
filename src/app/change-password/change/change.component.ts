import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {ChangeService} from "../change.service";
import {LoginResponse} from "../../login/LoginResponse";
import {User} from "../../user-administration/models/user";
import {LoginComponent} from "../../login/login/login.component";
import {UserService} from "../../user-administration/services/user.service";

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  // @ts-ignore
  loginResponse: LoginResponse ;
  user!: User;
  eroare!:string
  changeForm = this.fb.group({

    newPassword : ['', Validators.required],
    repeatNewPassword : ['', Validators.required],
  });

  constructor(private fb : FormBuilder, private changeService: ChangeService, private router: Router) { }

  onSubmit() {
    this.eroare=''

    const newPassword = this.changeForm.get('newPassword')?.value;
    const repeatNewPassword = this.changeForm.get('repeatNewPassword')?.value;

    if (newPassword && newPassword.length >5) {


      if (newPassword === repeatNewPassword) {


        this.user.password = newPassword as string
        this.user.firstLogin = false
        this.user.id = this.loginResponse.id
        this.changeService.updateUser(this.user)
        console.log("am trecut")

        this.router.navigate(['/campaign'])
      } else {
        this.eroare = "Passwords do not match."
      }
    }else{
      this.eroare = "Password too short."
    }


  }


  ngOnInit(): void {
    this.loginResponse = history.state.loginResponse;
    this.user={};
    this.eroare=''
  }
}
