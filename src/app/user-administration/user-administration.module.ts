import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAdministrationRoutingModule} from './user-administration-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {UserTableComponent} from './components/user-table/user-table.component';
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {DialogModule} from "primeng/dialog";
import {CampaignDialogComponent} from './components/campaign-dialog/campaign-dialog/campaign-dialog.component';
import {RippleModule} from "primeng/ripple";
import {UserNewDialogComponent} from './components/user-new-dialog/user-new-dialog/user-new-dialog.component';
import {MultiSelectModule} from "primeng/multiselect";
import {RoleDialogComponent} from "./components/role-dialog/role-dialog.component";
import {MessagesModule} from "primeng/messages";
import {UserEditDialogComponent} from "./components/user-edit-dialog/user-edit-dialog.component";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PasswordModule} from "primeng/password";


@NgModule({
  declarations: [
    UserTableComponent,
    CampaignDialogComponent,
    UserNewDialogComponent,
    RoleDialogComponent,
    UserEditDialogComponent

  ],
  imports: [
    CommonModule,
    UserAdministrationRoutingModule,
    TranslateModule,
    ToastModule,
    ButtonModule,
    TableModule,
    ChipsModule,
    CheckboxModule,
    FormsModule,
    DialogModule,
    RippleModule,
    MultiSelectModule,
    ReactiveFormsModule,
    MessagesModule,
    ToggleButtonModule,
    PasswordModule,
  ],
  exports: [
  ],
  providers: [
    DialogService
  ]
})
export class UserAdministrationModule { }
