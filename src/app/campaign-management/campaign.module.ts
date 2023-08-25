import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {ConfirmationService, MessageService} from "primeng/api";
import { DonorsDialogComponent } from './donors-dialog/donors-dialog.component';
import { DonationsDialogComponent } from './donations-dialog/donations-dialog.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [
        DonorsDialogComponent,
        DonationsDialogComponent
    ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ButtonModule,
    DialogModule,
    TableModule,
    TranslateModule
  ],
  exports: [
    DonorsDialogComponent,
    DonationsDialogComponent
  ],
    providers: [MessageService, ConfirmationService]   //le-am importat odata si acum nu mai compileaza fara ele desi nu-s folosite
})
export class CampaignModule { }
