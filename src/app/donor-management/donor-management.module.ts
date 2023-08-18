import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorComponent } from './donor/donor.component';
import { DonorManagementRoutingModule } from './donor-management-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";



@NgModule({
  declarations: [
    DonorComponent
  ],
    imports: [
        CommonModule,
        DonorManagementRoutingModule,
        TranslateModule,
        ButtonModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        PaginatorModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule
    ],
  providers :[MessageService,ConfirmationService]   //le-am importat odata si acum nu mai compileaza fara ele desi nu-s folosite

})
export class DonorManagementModule { }
