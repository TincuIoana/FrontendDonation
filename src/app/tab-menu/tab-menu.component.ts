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
        { icon: 'pi pi-building', tooltip: this.translate.instant('MENU.CAMPAIGNMANAGEMENT'), routerLink: ['/campaign'] },
        { icon: 'pi pi-id-card', tooltip: this.translate.instant('MENU.DONORMANAGEMENT'), routerLink: ['/donor-management'] },
        { icon: 'pi pi-dollar', tooltip: this.translate.instant('MENU.DONATIONMANAGEMENT'), routerLink: ['/donation-management'] },
        { icon: 'pi pi-user-edit', tooltip: this.translate.instant('MENU.ROLES'), routerLink: ['/roles-dialog'] },
      ];
      this.loginItem=[ { label: loginOrLogoutLabel, routerLink: loggedIn || isLoggedin ? ['/logout'] : ['/login'] },]

      this.authService.getUserPermissions().subscribe(permissions => {
        // Check if user has the admin role
        if (permissions.includes('USER_MANAGEMENT')) {
          // Add the "User Administration" menu item
          // @ts-ignore
          this.items.splice(1, 0, {
            // label: this.translate.instant('MENU.USERADMINISTRATION'),
            icon: 'pi pi-users',
            tooltip: this.translate.instant('MENU.USERADMINISTRATION'),
            routerLink: ['/user-administration']
          }
          );
        }
        });
      });
    });

  }


  // ngOnInit() {
  //   this.translate.stream([
  //     'MENU.USERADMINISTRATION',
  //     'MENU.CAMPAIGNMANAGEMENT',
  //     'MENU.DONORMANAGEMENT',
  //     'MENU.LOGOUT',
  //     'MENU.LOGIN',
  //     'MENU.ROLES',
  //     'MENU.SIGNIN'
  //   ]).subscribe(translations => {
  //     const loginLabel = translations['MENU.LOGIN'];
  //     const logoutLabel = translations['MENU.LOGOUT'];
  //     const token = sessionStorage.getItem("token")
  //     let isLoggedin = false
  //     isLoggedin = !!token;
  //     const loginOrLogoutLabel = isLoggedin ? logoutLabel : loginLabel;
  //
  //     // Initialize menu items with login/logout button
  //     this.items = [
  //       {label: loginOrLogoutLabel, routerLink: isLoggedin ? ['/logout'] : ['/login']},
  //       // {label: translations['MENU.USERADMINISTRATION'], routerLink: ['/user-administration']},
  //       {label: translations['MENU.CAMPAIGNMANAGEMENT'], routerLink: ['/campaign']},
  //       {label: translations['MENU.DONORMANAGEMENT'], routerLink: ['/donor-management']},
  //       {label: translations['MENU.ROLES'], routerLink: ['/roles-dialog']},
  //     ];
  //
  //     this.authService.getUserRoles().subscribe(roles => {
  //       // Check if user has the admin role
  //       if (roles.includes('ROLE_ADM')) {
  //         // Add the "User Administration" menu item
  //         // @ts-ignore
  //         this.items.splice(1, 0, {
  //           label: this.translate.instant('MENU.USERADMINISTRATION'),
  //           routerLink: ['/user-administration']
  //         });
  //       }
  //     });
  //
  //   })
  //
  // }

}
