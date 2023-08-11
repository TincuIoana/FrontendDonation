import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  // @ts-ignore
  shouldDisplayTabMenu: true;

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    // Fetch the translations for the keys
    this.translate.stream([
      'MENU.USERADMINISTRATION',
      'MENU.CAMPAIGNMANAGEMENT',
      'MENU.DONORMANAGEMENT',
      'MENU.LOGOUT',
      'MENU.LOGIN',
      'MENU.SIGNIN'
    ]).subscribe(translations => {
      // Assign the translations to the items array
      this.items = [
        {label: translations['MENU.USERADMINISTRATION'], routerLink: ['/user-administration']},
        {label: translations['MENU.CAMPAIGNMANAGEMENT']},
        {label: translations['MENU.DONORMANAGEMENT'], routerLink: ['/donor-management']},
        {label: translations['MENU.LOGOUT']},
        {label: translations['MENU.LOGIN'], routerLink: ['/login']},
        {label: translations['MENU.SIGNIN'], routerLink: ['/signin']},
      ];
    });
  }
}
