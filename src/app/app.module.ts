import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// PrimeNG imports
import {DropdownModule} from 'primeng/dropdown';

// ngx-translate imports
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login/login.component';

import {RolesDialogRoutingModule} from './roles-dialog/roles-dialog-routing.module';
import {PanelModule} from "primeng/panel";
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";

import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ListboxModule} from "primeng/listbox";
import {ChipsModule} from "primeng/chips";


import {SigninComponent} from './signin/signin/signin.component';
import {CampaignComponent} from './campaign-management/campaign/campaign.component';
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {RouterModule} from "@angular/router";
import {ToolbarModule} from "primeng/toolbar";
import {TabMenuComponent} from "./tab-menu/tab-menu.component";
import {NotificationComponent} from "./notificationSystem/notification/notification.component";
import {AppRoutingModule} from "./app-routing.module";
import {SidebarModule} from "primeng/sidebar";
import {CardModule} from "primeng/card";
import {CookieService} from "ngx-cookie-service";
import {Interceptor} from "./util/interceptors/interceptor";
import {MessageService} from "primeng/api";
import {LogoutComponent} from "./logout/logout/logout.component";
import {ChangeComponent} from "./change-password/change/change.component";
import {NgxCaptchaModule} from "ngx-captcha";

import {JwtInterceptor} from "./util/interceptors/JwtInterceptor";
import {NotificationGuard} from "./util/notification-guard";
import {Role_guards} from "./util/role_guards";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    LoginComponent,
    NotificationComponent,
    SigninComponent,
    CampaignComponent,
    LogoutComponent,
    ChangeComponent,

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

    RouterModule.forRoot([]),
    ChipsModule,

        ToastModule,
        SidebarModule,
        CardModule,


        TableModule,
        FileUploadModule,
        ToastModule,
        DialogModule,
        RadioButtonModule,
        PaginatorModule,
        ConfirmDialogModule,
        RatingModule,
        RippleModule,
        InputTextareaModule,
        ToolbarModule,
        CheckboxModule,
        MultiSelectModule,
        NgxCaptchaModule
    ],
providers: [CookieService,{provide:HTTP_INTERCEPTORS,useClass: Interceptor,multi: true},MessageService,Role_guards,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
