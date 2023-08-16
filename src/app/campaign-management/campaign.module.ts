import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {ConfirmationService, MessageService} from "primeng/api";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CampaignRoutingModule
  ],
  providers :[MessageService,ConfirmationService]   //le-am importat odata si acum nu mai compileaza fara ele desi nu-s folosite
})
export class CampaignModule { }
