import {Component, Input} from '@angular/core';
import {Campaign} from "../../../../campaign-management/campaign";

@Component({
  selector: 'app-campaign-dialog',
  templateUrl: './campaign-dialog.component.html',
  styleUrls: ['./campaign-dialog.component.css']
})
export class CampaignDialogComponent {
  @Input() campaigns!: Campaign[]

  showDialog!: boolean;
  showCampaigns() {
    this.showDialog = true;
  }
}
