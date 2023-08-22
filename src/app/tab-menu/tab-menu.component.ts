import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  // @ts-ignore
  shouldDisplayTabMenu: true;

  constructor(private translate: TranslateService, private authService: AuthService) {

  }

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
      console.log("in tabmenu:",this.authService.isLoggedin())

      // Determine the label for the login/logout button based on login status
      const loginOrLogoutLabel = this.authService.isLoggedin() ? logoutLabel : loginLabel;

      // Initialize menu items with login/logout button
      this.items = [
        { label: loginOrLogoutLabel, routerLink: this.authService.isLoggedin() ? ['/logout'] : ['/login'] },
        { label: translations['MENU.USERADMINISTRATION'], routerLink: ['/user-administration'] },
        { label: translations['MENU.CAMPAIGNMANAGEMENT'], routerLink: ['/campaign'] },
        { label: translations['MENU.DONORMANAGEMENT'], routerLink: ['/donor-management'] },
        { label: translations['MENU.ROLES'], routerLink: ['/roles-dialog'] },
      ];
    });
  }

}
