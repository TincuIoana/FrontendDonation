import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// PrimeNG imports
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';

// ngx-translate imports
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {TabMenuComponent} from './tab-menu/tab-menu.component';
import {LoginComponent} from './login/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {Interceptor} from './util/interceptors/interceptor';
import {CookieService} from 'ngx-cookie-service';

import {RolesDialogRoutingModule} from './roles-dialog/roles-dialog-routing.module';
import {PanelModule} from "primeng/panel";
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";

import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AutoComplete, AutoCompleteModule} from "primeng/autocomplete";
import {ListboxModule} from "primeng/listbox";


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
    ReactiveFormsModule,
    AppRoutingModule,


    // PrimeNG modules
    DropdownModule,
    ButtonModule,
    DynamicDialogModule,
    ListboxModule,

    // ngx-translate setup
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RolesDialogRoutingModule,
    PanelModule,
    TabMenuModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
