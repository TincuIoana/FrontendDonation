import {Component, Input} from '@angular/core';
import {Donor} from "../../donor-management/Donor";
import {Donation} from "../../donation-management/donation";

@Component({
  selector: 'app-donations-dialog',
  templateUrl: './donations-dialog.component.html',
  styleUrls: ['./donations-dialog.component.css']
})
export class DonationsDialogComponent {
  @Input() donations!: Donation[]

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
