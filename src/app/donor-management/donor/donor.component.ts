import {Component, OnInit} from '@angular/core';
import {DonorService} from "../donor.service";
import {Donor} from "../Donor";
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
// @ts-ignore
  donorDialog: boolean;
  // @ts-ignore
  donorDialog1: boolean;

  selectedDonor: any;

  // @ts-ignore
  donorListFromCampaign: Donor[]

    // @ts-ignore
  donorList : Donor[];

  // @ts-ignore
  selectedDonors: Donor[];

  // campaign: Campaign;

  // campaign:{id:number,name:string, purpose:string} ={id:0,name: '', purpose:''}
  donor:{id:number,firstName:string,lastName:string,additionalName:string,maidenName:string}={id:0,firstName:'',lastName:'',additionalName:'',maidenName:''}
  errorMessage:any

  // @ts-ignore
  submitted: boolean;
  Delete: any;

  constructor(private donorService: DonorService,private confirmationService:ConfirmationService, private translate: TranslateService) { }

  ngOnInit() {
    console.log("start donor manager")




      this.donorService.loadDonors().subscribe()
      this.donorService.getDonors().subscribe(don=> this.donorList=don)
      console.log(this.donorList)

  }

  openNew() {
    this.donor ={id:0,firstName:'',lastName:'',additionalName:'',maidenName:''}

    this.submitted = false;
    this.donorDialog = true;
  }
  hideDialog() {
    this.donorDialog = false;
    this.submitted = false;
  }
  hideDialog1() {
    this.donorDialog1 = false;
    this.submitted = false;
    window.location.reload()
  }


  removeExcessiveWhitespace(input: string): string {
    return input.replace(/\s+/g, ' ').trim();
  }


  saveDonor() {
    this.submitted = true;
    if(this.donor.firstName && this.donor.lastName &&
      this.donor.firstName.replace(/\s/g, '').length>0 && this.donor.lastName.replace(/\s/g, '').length>0 ) {
      const newDonor = {firstName: this.removeExcessiveWhitespace(this.donor.firstName), lastName: this.removeExcessiveWhitespace(this.donor.lastName),
        additionalName: this.removeExcessiveWhitespace(this.donor.additionalName), maidenName: this.removeExcessiveWhitespace(this.donor.maidenName)}

      this.donorService.saveDonorToDB(newDonor)

      this.donorList = [...this.donorList]
      this.donorDialog = false
      this.donor = {id: 0, firstName: '', lastName: '', additionalName: '', maidenName: ''}
      window.location.reload()


    }else{
      console.warn('Donor first name or last name cannot be empty.');
      this.errorMessage = "Campaign name or purpose cannot be empty.";
    }
  }


  editDonor() {
    this.submitted = true;
    const donor = this.selectedDonor
    console.log(donor.id)
    this.donorService.updateDonorFromDB(donor.id.toString(),this.donor)
    this.donorDialog1=false
    // this.donor ={id:0,firstName:'',lastName:'',additionalName:'',maidenName:''}
    setTimeout(() => {
      document.location.reload();
    }, 100);


  }


  async deleteDonor(donor: any) {
    const userConfirmed = await this.confirm();
    if (userConfirmed) {
      console.log(donor.id)
      this.donorService.deleteFromDB(donor.id.toString())
      setTimeout(() => {
        document.location.reload();
      }, 100);
    }


  }



  async deleteSelectedDonors() {
    const userConfirmed = await this.confirm();
    if (userConfirmed) {
      this.selectedDonors.forEach(donor => {
        const id = donor.id;
        console.log(id);

        // @ts-ignore
        this.donorService.deleteFromDB(id.toString())
      });


      // setTimeout(() => {
      //   document.location.reload();
      // }, 100);
    }
  }
  openEdit(donor: any) {
    this.selectedDonor = donor;
    this.donor = donor
    this.submitted = false;
    this.donorDialog1 = true;

  }

  fullTextMap: Record<string, boolean> = {};

  toggleFullText(donor: any, field: string): void {
    this.fullTextMap[field] = !this.fullTextMap[field];
  }

  getDisplayText(text: string): string {
    const maxLength = 12; // Adjust as needed
    if(text){
      if (text.length > maxLength && !this.fullTextMap[text]) {
        return text.substring(0, maxLength - 3) + '...';
      }
    }
    return text || "";
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
            setTimeout(() => {
              document.location.reload();
            }, 100);
          },
        });
      });
    } catch (error) {
      console.error('Error in confirm():', error);
      return false;
    }
  }




}
