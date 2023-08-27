import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  loginItem: MenuItem[] | undefined;

  // @ts-ignore
  shouldDisplayTabMenu: true;

  constructor(private translate: TranslateService, private loginService: LoginService,private authService:AuthService) {

  }

  private loggedInSubscription: Subscription | undefined;

  ngOnInit() {
    // Fetch the translations for the keys
    this.translate.stream([
      'MENU.USERADMINISTRATION',
      'MENU.CAMPAIGNMANAGEMENT',
      'MENU.DONORMANAGEMENT',
      'MENU.DONATIONMANAGEMENT',
      'MENU.LOGOUT',
      'MENU.LOGIN',
      'MENU.ROLES',
      'MENU.SIGNIN'
    ]).subscribe(translations => {
    this.loggedInSubscription = this.loginService.isLoggedInfunction().subscribe(loggedIn => {
      const loginLabel = this.translate.instant('MENU.LOGIN');
      const logoutLabel = this.translate.instant('MENU.LOGOUT');
      const token:string|null|undefined = sessionStorage.getItem("token")?? ''
      console.log("aici")
      let isLoggedin = false
      isLoggedin = !!token;
      if( token!=='' || token  ){
        isLoggedin=true;
      }
      else{
        isLoggedin=false
      }

      const loginOrLogoutLabel = loggedIn  ? logoutLabel : loginLabel;
      const labelForLogIn = 'pi pi-sign-in';
      const labelForLogOut = 'pi pi-sign-out';
      const logInOrLogOut = loggedIn || isLoggedin ? labelForLogOut : labelForLogIn;

      this.items = [
        { icon: logInOrLogOut, routerLink: loggedIn || isLoggedin ? ['/logout'] : ['/login'] },
        { icon: 'pi pi-users', tooltip: this.translate.instant('MENU.USERADMINISTRATION'), routerLink: ['/user-administration'] },
        { icon: 'pi pi-building', tooltip: this.translate.instant('MENU.CAMPAIGNMANAGEMENT'), routerLink: ['/campaign'] },
        { icon: 'pi pi-id-card', tooltip: this.translate.instant('MENU.DONORMANAGEMENT'), routerLink: ['/donor-management'] },
        { icon: 'pi pi-dollar', tooltip: this.translate.instant('MENU.DONATIONMANAGEMENT'), routerLink: ['/donation-management'] },
        { icon: 'pi pi-user-edit', tooltip: this.translate.instant('MENU.ROLES'), routerLink: ['/roles-dialog'] }
      ];
      });
    });
  }
}
