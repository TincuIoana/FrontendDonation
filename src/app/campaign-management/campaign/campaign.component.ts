import {Component, OnInit} from '@angular/core';
import {Campaign} from "../campaign";
import {CampaignService} from "../campaign.service";

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




  // @ts-ignore
  campaignList : Campaign[];

  // @ts-ignore
  selectedCampaigns: Campaign[];

  // campaign: Campaign;

  campaign:{id:number,name:string, purpose:string} ={id:0,name: '', purpose:''}



  // @ts-ignore
  submitted: boolean;
  Delete: any;

  constructor(private campaignService: CampaignService) { }

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
  hideDialog() {
    this.campaignDialog = false;
    this.submitted = false;
  }





  saveCampaign() {
    this.submitted = true;
    console.log(this.campaign.name)
    console.log(this.campaign.purpose)

    const newCampaign = new Campaign(this.campaign.name,this.campaign.purpose)
    this.campaignService.saveCampaignToDB(newCampaign)

      this.campaignList = [...this.campaignList];
      this.campaignDialog = false;
      this.campaign = {id:0,name: '', purpose:''}
    window.location.reload()
    }


  editCampaign() {
    this.submitted = true;
    const campaign = this.selectedCampaign
    // this.campaign = {...(campaign)};
    console.log(campaign.id)
    console.log(this.campaign.name)
    console.log(this.campaign.purpose)
    this.campaignService.updateCampaignFromDB(campaign.id.toString(),this.campaign);
    this.campaignDialog1 = false;

    this.campaign = {id:0,name: '', purpose:''}

    window.location.reload()

  }


  deleteCampaign(campaign: any) {
    const id = campaign.id;
    console.log(id)
    this.campaignService.deleteFromDB("/"+id)
    window.location.reload()


  }



  deleteSelectedCampaigns() {
    this.selectedCampaigns.forEach(campaign => {
      const id = campaign.id;
      console.log(id);

      this.campaignService.deleteFromDB("/" + id)
    });

    // Refresh the page after deleting all campaigns
    window.location.reload();
  }
  openEdit(campaign: any) {
    this.selectedCampaign = campaign;
    console.log(this.selectedCampaign.id)
    this.submitted = false;
    this.campaignDialog1 = true;

  }


}
