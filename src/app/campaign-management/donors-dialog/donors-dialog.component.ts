import {Component, Input} from '@angular/core';
import {Campaign} from "../campaign";
import {Donor} from "../../donor-management/Donor";

@Component({
  selector: 'app-donors-dialog',
  templateUrl: './donors-dialog.component.html',
  styleUrls: ['./donors-dialog.component.css']
})
export class DonorsDialogComponent {

  @Input() donors!: Donor[]

  showDialog!: boolean;
  showCampaigns() {
    this.showDialog = true;
  }

  truncateText(text: string, maxLength: number = 12): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  fullTextMap: Record<string, boolean> = {};

  toggleFullText(donor: any, field: string): void {
    this.fullTextMap[field] = !this.fullTextMap[field];
  }

  getDisplayText(text: string): string {
    const maxLength = 12; // Adjust as needed
    if (text.length > maxLength && !this.fullTextMap[text]) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }


}
