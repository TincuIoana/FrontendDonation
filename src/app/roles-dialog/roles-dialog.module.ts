import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesDialogRoutingModule} from "./roles-dialog-routing.module";
import {RolesDialogService} from "./roles-dialog.service";
import {RolesDialogComponent} from "./roles-dialog.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import {ToastModule} from "primeng/toast";
import {ListboxModule} from "primeng/listbox";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {MenuModule} from "primeng/menu";


@NgModule({
  declarations: [
    RolesDialogComponent
  ],
    imports: [
        CommonModule,
        RolesDialogRoutingModule,
        ButtonModule,
        TableModule,
        TranslateModule,
        ToastModule,
        ListboxModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        CascadeSelectModule,
        RippleModule,
        MenuModule
    ],
  providers: [
    RolesDialogService]
})
export class RolesDialogModule { }
