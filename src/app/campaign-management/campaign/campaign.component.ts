import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Campaign} from "../campaign";
import {CampaignService} from "../campaign.service";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {MessageService} from "primeng/api";
import {Donation} from "../../donation-management/donation";
import {Donor} from "../../donor-management/Donor";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";

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
              ,private cdr: ChangeDetectorRef,private http: HttpClient) { }

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




  campnerror! : string;


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

    this.campaignService.updateCampaignFromDB(this.selectedCampaign.id.toString(),this.selectedCampaign).subscribe(
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


  deleteCampaign(campaign: any) {
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



  deleteSelectedCampaigns() {
    this.selectedCampaigns.forEach(campaign => {
      const id = campaign.id;
      console.log(id);

      this.campaignService.deleteFromDB(id.toString()).subscribe()
    });

    window.location.reload();
  }





  private showError(message:string) {
    this.messageService.add({
      severity: 'error', // Severity level for styling (success, info, warn, error)
      summary: 'Error',
      detail: message,
      life: 5000 // Duration in milliseconds
    });


  }

  checkIfReporter():boolean{ //check if user is cenzor for restricted visualization
    const storedPermissions   = localStorage.getItem("permissions")
    const userPermissions: Array<string> = storedPermissions ? JSON.parse(storedPermissions) :[]
    return userPermissions.includes("CAMP_REPORT_RESTRICTED") && userPermissions.length === 1 ;

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



}
