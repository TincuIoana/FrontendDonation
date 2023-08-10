import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// PrimeNG imports
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';

// ngx-translate imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {PanelModule} from "primeng/panel";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "./login/login/login.component";
import {TabMenuModule} from "primeng/tabmenu";
import {TabMenuComponent} from "./tab-menu/tab-menu.component";
import {AppRoutingModule} from "./app-routing.module";
import {Interceptor} from "./util/interceptors/interceptor";
import {CookieService} from "ngx-cookie-service";
import {ChipsModule} from "primeng/chips";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,

    // PrimeNG modules
    DropdownModule,
    ToolbarModule,

    // ngx-translate setup
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    PanelModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    TabMenuModule,
    RouterModule.forRoot([]),
    ChipsModule,
  ],
  providers: [CookieService,{provide:HTTP_INTERCEPTORS,useClass: Interceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
