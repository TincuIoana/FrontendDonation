import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Campaign} from "../campaign";
import {CampaignService} from "../campaign.service";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Donation} from "../../donation-management/donation";
import {Donor} from "../../donor-management/Donor";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import * as XLSX from 'xlsx';
import {LoginService} from "../../login/login.service";


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {




  // @ts-ignore
  campaignDialog: boolean;
  // @ts-ignore
  campaignDialog1: boolean;

  selectedCampaign: any;

  errorMessage:any
  campaignErrors: { [campaignId: string]: string } = {};




  // @ts-ignore
  campaignList : Campaign[];

  // @ts-ignore
  donorList: Donor[];

  // @ts-ignore
  donationsList: Donation[];

  // @ts-ignore
  selectedCampaigns: Campaign[];

  // campaign: Campaign;

  campaign:{id:number,name:string, purpose:string} ={id:0,name: '', purpose:''}
  auxcampaign:{id:number,name:string, purpose:string} ={id:0,name: '', purpose:''}



  // @ts-ignore
  submitted: boolean;
  Delete: any;

  constructor(private campaignService: CampaignService,private messageService: MessageService, private router:Router,private translate: TranslateService
              ,private cdr: ChangeDetectorRef,private http: HttpClient,private confirmationService: ConfirmationService, private loginService: LoginService) { }

  ngOnInit() {
    console.log("start campaign manager")
    this.campaignService.loadCampaigns().subscribe();
    this.campaignService.getCampaigns().subscribe((campaigns) => this.campaignList = campaigns);
    console.log("no error")


  }

  openNew() {
    this.campaign ={id:0,name: '', purpose:''};
    this.submitted = false;
    this.campaignDialog = true;
  }
  hideDialog1() {
    this.campaignDialog1 = false;
    this.submitted = false;
    this.campaign = {id: 0, name: '', purpose: ''}
    window.location.reload()
    return false
  }
  hideDialog() {
    this.campaignDialog = false;
    this.submitted = false;
    this.campaign = {id: 0, name: '', purpose: ''}


  }


  removeExcessiveWhitespace(input: string): string {
    return input.replace(/\s+/g, ' ').trim();
  }






  saveCampaign() {
    this.submitted = true;
    console.log(this.campaign.name);
    console.log(this.campaign.purpose);

    if (this.campaign.name && this.campaign.purpose && this.campaign.name.replace(/\s/g, '').length > 0) {
      const newCampaign = new Campaign(
        this.removeExcessiveWhitespace(this.campaign.name),
        this.removeExcessiveWhitespace(this.campaign.purpose)
      );

      this.campaignService.saveCampaignToDB(newCampaign).subscribe(
        response => {
          console.log('added successfully:', response);

          // Update campaignList with the newly added campaign
          this.campaignList.push(response); // Assuming response is the newly added campaign object
          this.campaignList = [...this.campaignList]; // Try assigning to a new reference
          this.cdr.detectChanges();
          this.campaignDialog = false;
          this.campaign = { id: 0, name: '', purpose: '' };
          document.location.reload()
        },
        error => {
          console.error('Error adding campaign:', error.error);
          const errorMessage = error.error.text;
          this.showError(errorMessage.toString());
        }
      );
    } else {
      console.warn('Campaign name or purpose cannot be empty.');
      this.errorMessage = "Campaign name or purpose cannot be empty.";
    }
  }
  openEdit(campaign: any) {
    this.selectedCampaign = campaign;
    this.auxcampaign=Object.assign({}, this.selectedCampaign);
    console.log(this.auxcampaign)
    this.campaign=campaign
    console.log(this.selectedCampaign.id)
    this.submitted = false;
    this.campaignDialog1 = true;

  }

  editCampaign() {
    this.submitted = true;

    const campaign = this.selectedCampaign
    // this.campaign = {...(campaign)};
    console.log(campaign.id)
    console.log(this.campaign.name)
    console.log(this.campaign.purpose)
    if (this.campaign.name && this.campaign.purpose && this.campaign.name.replace(/\s/g, '').length > 0) {
      const newCampaign = new Campaign(
        this.removeExcessiveWhitespace(this.campaign.name),
        this.removeExcessiveWhitespace(this.campaign.purpose)
      );


      this.campaignService.updateCampaignFromDB(this.selectedCampaign.id.toString(), newCampaign).subscribe(
        response => {
          console.log('edited successfully:', response);
          window.location.reload()
          this.campaignDialog1 = false;

        },
        error => {

          console.error('Error editing campaign:', error.error);
          const errorMessage = error.error.text;
          this.showError(errorMessage.toString());

        }
      )
    }
    else {
      console.warn('Campaign name or purpose cannot be empty.');
      this.errorMessage = "Campaign name or purpose cannot be empty.";
    }





  }


  async deleteCampaign(campaign: any) {
    console.log('deleting')
    const userConfirmed = await this.confirm();
    if (userConfirmed) {
      const id = campaign.id;
      console.log(id)
      this.campaignService.deleteFromDB(id.toString()).subscribe(
        response => {
          console.log('Deleted successfully:', response);
          this.campaignErrors[campaign.id] = ''; // Clear the error message if deletion was successful
          window.location.reload()

        },
        error => {
          this.campaignErrors[campaign.id] = error.error.text;
          console.error('Error deleting campaign:', error.error);
          this.showError(error.error.text)
        }
      );
    }


  }



  async deleteSelectedCampaigns() {
    const userConfirmed = await this.confirm();
    if (userConfirmed) {
      this.selectedCampaigns.forEach(campaign => {
        const id = campaign.id;
        console.log(id);

        this.campaignService.deleteFromDB(id.toString()).subscribe(
          response => {
            console.log('Deleted successfully:', response);
            this.campaignErrors[campaign.id] = ''; // Clear the error message if deletion was successful
            window.location.reload()

          },
          error => {
            this.campaignErrors[campaign.id] = error.error.text;
            console.error('Error deleting campaign:', error.error);
            this.showError(error.error.text)
          });

      })
    }
    else console.log("asd")
  }





  private showError(message:string) {
    this.messageService.add({
      severity: 'error', // Severity level for styling (success, info, warn, error)
      summary: 'Error',
      detail: message,
      life: 5000 // Duration in milliseconds
    });


  }
  checkIfCanExport():boolean{
    const userPermissions: Array<string> = this.loginService.getLoggedUserPermissions();


    return  userPermissions.includes("CAMP_REPORTING");

  }

  checkIfReporter():boolean{ //check if user is reporter for restricted visualization
    const userPermissions: Array<string> = this.loginService.getLoggedUserPermissions();


    return (userPermissions.includes("CAMP_REPORT_RESTRICTED") || userPermissions.includes("CAMP_REPORTING"))  && !userPermissions.includes("CAMP_MANAGEMENT") ;

  }

  campaignDonations(id:number):Donation[]{
    this.campaignService.loadDonations(id.toString()).subscribe(donations=>this.donationsList=donations);
    console.log("donations added")
    return this.donationsList;
  }


  campaignDonors(id : number):Donor[] {
    this.campaignService.loadDonators(id.toString()).subscribe(donors=> this.donorList=donors);
    console.log("donors added")
    return this.donorList
  }


  fullTextMap: Record<string, boolean> = {};  //daca textul e full sau truncat
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



  exportStyledCampaignsWithDonators(): void {
    this.campaignService.getCampaignsWithDonators().subscribe(data => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.map(item => ({
        'Campaign Name': item.campaign.name,
        'Donator Names': item.donators.map(d => d.firstName + ' ' + d.lastName).join(', ')
      })));

      // Example of adding some basic styling
      if (!ws['!cols']) ws['!cols'] = [];
      ws['!cols'][0] = { width: 20 }; // Set width for the first column
      ws['!cols'][1] = { width: 40 }; // Set width for the second column

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      XLSX.writeFile(wb, 'campaigns_with_donators.xlsx');
    });
  }

  async confirm(): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        this.confirmationService.confirm({
          message:  this.translate.instant('ERROR.SURE'),
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

}
