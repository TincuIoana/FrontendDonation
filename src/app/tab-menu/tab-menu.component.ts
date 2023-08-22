import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  // @ts-ignore
  shouldDisplayTabMenu: true;

  constructor(private translate: TranslateService, private authService: AuthService) {

  }

  private loggedInSubscription: Subscription | undefined;

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
  //   this.loggedInSubscription = this.authService.isLoggedin().subscribe(loggedIn => {
  //     const loginLabel = this.translate.instant('MENU.LOGIN');
  //     const logoutLabel = this.translate.instant('MENU.LOGOUT');
  //
  //     // Determine the label for the login/logout button based on login status
  //     const loginOrLogoutLabel = loggedIn ? logoutLabel : loginLabel;
  //
  //     // Initialize menu items with login/logout button
  //     this.items = [
  //       { label: loginOrLogoutLabel, routerLink: loggedIn ? ['/logout'] : ['/login'] },
  //       // { label: this.translate.instant('MENU.USERADMINISTRATION'), routerLink: ['/user-administration'] },
  //       { label: this.translate.instant('MENU.CAMPAIGNMANAGEMENT'), routerLink: ['/campaign'] },
  //       { label: this.translate.instant('MENU.DONORMANAGEMENT'), routerLink: ['/donor-management'] },
  //       { label: this.translate.instant('MENU.ROLES'), routerLink: ['/roles-dialog'] },
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
  //       });
  //     });
  //   });
  //
  // }


  ngOnInit() {
    this.translate.stream([
      'MENU.USERADMINISTRATION',
      'MENU.CAMPAIGNMANAGEMENT',
      'MENU.DONORMANAGEMENT',
      'MENU.LOGOUT',
      'MENU.LOGIN',
      'MENU.ROLES',
      'MENU.SIGNIN'
    ]).subscribe(translations => {
      const loginLabel = translations['MENU.LOGIN'];
      const logoutLabel = translations['MENU.LOGOUT'];
      const token = localStorage.getItem("token")
      let isLoggedin = false
      // Determine the label for the login/logout button based on login status
      isLoggedin = !!token;
      const loginOrLogoutLabel = isLoggedin ? logoutLabel : loginLabel;

      // Initialize menu items with login/logout button
      this.items = [
        {label: loginOrLogoutLabel, routerLink: isLoggedin ? ['/logout'] : ['/login']},
        // {label: translations['MENU.USERADMINISTRATION'], routerLink: ['/user-administration']},
        {label: translations['MENU.CAMPAIGNMANAGEMENT'], routerLink: ['/campaign']},
        {label: translations['MENU.DONORMANAGEMENT'], routerLink: ['/donor-management']},
        {label: translations['MENU.ROLES'], routerLink: ['/roles-dialog']},
      ];

      this.authService.getUserRoles().subscribe(roles => {
        // Check if user has the admin role
        if (roles.includes('ROLE_ADM')) {
          // Add the "User Administration" menu item
          // @ts-ignore
          this.items.splice(1, 0, {
            label: this.translate.instant('MENU.USERADMINISTRATION'),
            routerLink: ['/user-administration']
          });
        }
      });

    })

  }

}
