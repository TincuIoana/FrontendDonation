import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languages!: any[];
  selectedLanguage: any;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ro']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|ro/) ? browserLang : 'en');

    this.languages = [
      { label: 'EN', code: 'en' },
      { label: 'RO', code: 'ro' }
    ];

    this.selectedLanguage = this.languages.find(lang => lang.code === this.translate.currentLang);
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
  }
}
