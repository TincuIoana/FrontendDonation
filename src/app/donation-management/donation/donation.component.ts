// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {Donation} from "../donation";
import {DonationService} from "../donation.service";
import {User} from "../../user-administration/models/user";
import {Campaign} from "../../campaign-management/campaign";
import {Donor} from "../../donor-management/Donor";
import {CampaignService} from "../../campaign-management/campaign.service";
import {DonorService} from "../../donor-management/donor.service";
import {LoginService} from "../../login/login.service";
import * as XLSX from 'xlsx';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  currencies: any[] | undefined;
  selectedCurrency: any | undefined;

  allCampaigns!: Campaign[];
  selectedCampaign: any | undefined;

  allDonors!: Donor[];
  selectedDonor: any | undefined;


  // @ts-ignore
  donationDialog: boolean;

  // @ts-ignore
  updateDonationDialog: boolean;

  selectedDonation: any;

  errorMessage: any;

  // @ts-ignore
  donationList: Donation[];
  // @ts-ignore
  selectedDonations: Donation[];

  // @ts-ignore
  donation: {
    id: number,
    amount: number,
    approved: boolean | null,
    createdDate: Date,
    currency: string,
    notes: string,
    approvedBy: User | null,
    campaign: Campaign,
    createdBy: User ,
    donor: Donor,
    approveDate: Date | null
  } = {
    id: 0,
    amount: 0,
    approved: false,
    createdDate: new Date(),
    currency: this.selectedCurrency,
    notes: '',
    approvedBy: this.emptyUser(),
    //approvedBy: User = {},
    campaign: this.selectedCampaign,
    createdBy: this.goodUser(),
    //createdBy: User = {id: parseInt(sessionStorage.getItem('id'))},
    donor: this.selectedDonor, // those are empty objects
    //donor: Donor = {},
    approveDate: null
  };

  // @ts-ignore
  submitted: boolean;
  delete: any
  userId: number = parseInt(this.loginService.getLoggedUserId());


  constructor (private donationService: DonationService,
               private campaignService: CampaignService,
               private donorService: DonorService,
               private loginService: LoginService,
               private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.donationService.loadDonations().subscribe();
    this.donationService.getDonations().subscribe((donations) => this.donationList = donations);

    this.currencies = [
      {code: '1', name: 'EUR'},
      {code: '2', name: 'USD'},
      {code: '3', name: 'RON'},
      {code: '4', name: 'YEN'}
    ]

    this.campaignService.loadCampaigns().subscribe(campaigns => {
      this.allCampaigns = campaigns;
    });

    this.donorService.loadDonors().subscribe(donors => {
      this.allDonors = donors;
      console.log(this.allDonors);
    })
  }

  openNew() {
    this.clearDonationForm();
    this.submitted = false;
    this.donationDialog = true;
  }

  approveDonation(donation: any) {
    const id = donation.id;
    this.donationService.approveDonationDB(donation.id.toString(), donation);
    window.location.reload();
  }

  async deleteDonation(donation: any) {
    const userConfirmed = await this.confirm();
    if (userConfirmed) {
      const id = donation.id;
      this.donationService.deleteDonationDB(id.toString())
      window.location.reload();
    }
  }
  async confirm(): Promise<boolean> {
    try {
      return new Promise((resolve) => {

        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            resolve(true);
          },
          reject: () => {
            resolve(false);

            window.location.reload()
          },
        });
      });
    } catch (error) {
      console.error('Error in confirm():', error);
      return false;
    }
  }


  editDonation() {
    this.submitted = true;
    let camp = new Campaign();
    let donor = this.emptyDonor();
    let user = this.goodUser();

    const donation = this.selectedDonation;
    console.log(donation);
    camp.id = this.selectedCampaign.id;
    donor.id = this.selectedDonor.id
    donation.currency = this.selectedCurrency.name;
    donation.createdBy = user;

    donation.campaign = camp;
    donation.donor = donor;




    this.donationService.updateDonationDB(donation.id.toString(), this.donation);
    this.updateDonationDialog = false;
    window.location.reload();
  }




// Helper function to clear the donation form
  clearDonationForm() {
    this.donation = {
      id: 0,
      amount: 0,
      approved: false,
      createdDate: new Date(),
      currency: '',
      notes: '',
      approvedBy: null,
      campaign: new Campaign('', ''),
      createdBy: this.goodUser(),
      donor: this.emptyDonor(),
      approveDate: null,
    };
  }

  saveDonation() {
    this.submitted = true;
    this.donation.campaign.id = this.selectedCampaign.id;
    this.donation.donor.id = this.selectedDonor.id;
    this.donation.currency = this.selectedCurrency.name;
    this.donation.createdBy.id = this.userId;
    console.log(this.donation.campaign.id);
    console.log(this.donation.donor.id);
    let camp = new Campaign(this.donation.campaign.name, this.donation.campaign.purpose);
    camp.id = this.donation.campaign.id;

    let don = this.emptyDonor();
    don.id = this.donation.donor.id;
    don.firstName = this.donation.donor.firstName;
    don.lastName = this.donation.donor.lastName;
    don.additionalName = this.donation.donor.additionalName;
    don.maidenName = this.donation.donor.maidenName;

    console.log(camp);
    console.log(don);

    // Check if required fields are filled out and have valid data
    if (
      this.donation.amount > 0
      && this.donation.currency !== ''
      && camp.id !== undefined
      && don.id !== undefined
    ) {
      // Create a new Donation object
      const newDonation = new Donation(
        this.donation.amount,
        this.donation.createdDate,
        this.donation.currency,
        camp,
        this.donation.createdBy || null, // Set createdBy to null if not provided
        don,
        this.donation.approveDate || null, // Set approveDate to null if not provided
        this.donation.approved || false, // Set approved to false if not provided


        this.donation.notes || '', // Provide an empty string if notes are not provided
        this.donation.approvedBy || null // Set approvedBy to null if not provided
      );

      this.donationService.saveDonationDB(camp.id, don.id, newDonation);
      this.donationList = [...this.donationList];
      this.donationDialog = false;
      this.clearDonationForm();
      window.location.reload();




    } else {
      console.warn('Checks failed!');
      this.errorMessage='Checks failed!';
    }
  }



  deleteSelectedDonations() {
    this.selectedDonations.forEach(donation => {
      const id = donation.id;
      console.log(id);

      this.donationService.deleteDonationDB(id.toString())
    });
    window.location.reload();
  }

  openEdit(donation: any) {
    this.selectedDonation = donation;
    this.donation = donation;

    this.submitted = false;
    this.updateDonationDialog = true;
  }

  hideDialog() {
    this.donationDialog = false;
    this.submitted = false;
  }

  removeExcessiveWhitespace(input: string): string {
    return input.replace(/\s+/g, ' ').trim();
  }

  goodUser(): User {
    return {
      id: parseInt(sessionStorage.getItem('id')),
      // firstName: '',
      // lastName: '',
      // mobileNumber: '',
      // username: '',
      // email: '',
      // roles: [],
      // campaigns: [],
      // password: '',
      // active: false,
      // firstLogin: false,
      // retryCount: 0
    };
  }

  emptyUser(): User {
    return {
      id: 0,
      // firstName: '',
      // lastName: '',
      // mobileNumber: '',
      // username: '',
      // email: '',
      // roles: [],
      // campaigns: [],
      // password: '',
      // active: false,
      // firstLogin: false,
      // retryCount: 0
    };
  }

  emptyDonor(): Donor {
    return {
      id: 0,
      // firstName: '',
      // lastName: '',
      // additionalName: '',
      // maidenName: ''
    };
  }


  exportViewToXLSX() {
    const data = this.donationList.map(donation => {
      const approveDate = donation.approveDate ? new Date(donation.approveDate).toISOString().split('T')[0] : '';
      const createdDate = donation.createdDate ? new Date(donation.createdDate).toISOString().split('T')[0] : '';

      return {
        'Amount': donation.amount,
        'Approve Date': approveDate,
        'Approved': donation.approved ? 'Yes' : 'No',
        'Created Date': createdDate,
        'Currency': donation.currency,
        'Notes': donation.notes,
        'Approved By': donation.approvedBy ? donation.approvedBy.username : '',
        'Campaign Name': donation.campaign.name,
        'Created By': donation.createdBy.username,
        'Donor First Name': donation.donor.firstName,
        'Donor Last Name': donation.donor.lastName
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    // Set width for all columns
    if (!ws['!cols']) ws['!cols'] = [];
    const columnWidth = 20; // You can adjust this value as needed
    Object.keys(data[0]).forEach((key, index) => {
      ws['!cols'][index] = { width: columnWidth };
    });
    // Highlight the header
    const headerStyle = {
      font: {
        bold: true
      },
      fill: {
        fgColor: { rgb: "FFFF00" } // Yellow fill. You can adjust the color as needed.
      }
    };

    const headers = Object.keys(data[0]);
    for (let i = 0; i < headers.length; i++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: i }); // 0 is the first row
      if (!ws[cellAddress]) continue; // Skip if cell doesn't exist
      ws[cellAddress].s = headerStyle;
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Donations');

    this.downloadXLSX(wb);
  }

  downloadXLSX(wb: XLSX.WorkBook) {
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donations.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
