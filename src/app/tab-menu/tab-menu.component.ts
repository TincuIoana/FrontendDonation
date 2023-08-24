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
    this.loggedInSubscription = this.authService.isLoggedin().subscribe(loggedIn => {
      const loginLabel = this.translate.instant('MENU.LOGIN');
      const logoutLabel = this.translate.instant('MENU.LOGOUT');
      const token = localStorage.getItem("token")
      let isLoggedin = false
      isLoggedin = !!token;

      const loginOrLogoutLabel = loggedIn || isLoggedin ? logoutLabel : loginLabel;

      this.items = [
        { label: loginOrLogoutLabel, routerLink: loggedIn || isLoggedin ? ['/logout'] : ['/login'] },
        { label: this.translate.instant('MENU.CAMPAIGNMANAGEMENT'), routerLink: ['/campaign'] },
        { label: this.translate.instant('MENU.DONORMANAGEMENT'), routerLink: ['/donor-management'] },
        {label: this.translate.instant('MENU.DONATIONMANAGEMENT'), routerLink: ['/donation-management']},
        { label: this.translate.instant('MENU.ROLES'), routerLink: ['/roles-dialog'] },
      ];

      this.authService.getUserRoles().subscribe(roles => {
        // Check if user has the admin role
        if (roles.includes('USER_MANAGEMENT')) {
          // Add the "User Administration" menu item
          // @ts-ignore
          this.items.splice(1, 0, {
            label: this.translate.instant('MENU.USERADMINISTRATION'),
            routerLink: ['/user-administration']
          }
          );
        }
        });
      });
    });
  }
}
