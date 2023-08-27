// @ts-nocheck
import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user.service";
import {Campaign} from "../../../../campaign-management/campaign";
import {CampaignService} from "../../../../campaign-management/campaign.service";
import {RolesDialogService} from "../../../../roles-dialog/roles-dialog.service";
import {tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Role} from "../../../models/role";

@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.css']
})
export class UserNewDialogComponent implements OnInit {
  showDialog!: boolean;
  submitted!: boolean;
  allRoles!: Role[];
  user!: User
  allCampaigns!: Campaign[];

  emailMessage!: string;
  mobileNumberMessage!: string;
  errorMessage!: string;

  @Input() registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
    mobileNumber: ['', Validators.pattern('^(?:(?:\\+?40)|0)?7\\d{8}$')],
    roles: new FormControl<Role[]>([], Validators.required),
    campaigns: [[]]
  })
  backendEmailError: boolean = false
  backendMobileNumberError: boolean = false;


  constructor(
    private campaignService: CampaignService,
    private roleService: RolesDialogService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.campaignService.loadCampaigns().subscribe(campaigns => {
      this.allCampaigns = campaigns;
    });

    this.roleService.loadRoles().subscribe(roles => {
      roles.forEach(role => role.permissions = [])
      this.allRoles = roles;
    });
  }

  openNew() {
    this.user = {}
    this.clearForm();
    this.submitted = false;
    this.showDialog = true;
  }


  createUser() {

    this.submitted = true;
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.email = this.registerForm.value.email;
    this.user.mobileNumber = this.registerForm.value.mobileNumber;
    this.user.roles = this.registerForm.controls.roles.value
    this.user.campaigns = this.registerForm.controls.campaigns.value;
    console.log(this.user)

    this.userService.createUser(this.user)
      .pipe(tap(
        (response) => {
          if (response["errorType"]) {
            this.translate.stream([
              "USER.EMAIL_REQUIRED",
              "USER.EMAIL_INVALID",
              "USER.EMAIL_IN_USE",
              "USER.MOBILE_NUMBER_INVALID",
              "USER.MOBILE_NUMBER_REQUIRED",
              "USER.MOBILE_NUMBER_IN_USE"
            ]).subscribe(translations => {
              if (response.errorType.includes("EMAIL")) {
                this.emailMessage = translations["USER." + response.errorType]
                this.backendEmailError = true;
              } else if (response.errorType.includes("MOBILE")) {
                this.mobileNumberMessage = translations["USER." + response.errorType]
                this.backendMobileNumberError = true;
              } else {
                this.errorMessage = translations["USER." + response.errorType]
                this.messageService.add({severity: 'error', summary: 'Error', detail: `${this.errorMessage}`});
              }
            });
          } else {
            this.translate.stream([
              "USER.CREATED"
            ]).subscribe(translations => {
              this.messageService.add({severity: 'success', summary: 'Successful', detail: translations["USER.CREATED"]});
            });
            this.showDialog = false;
            setTimeout(() => {
              document.location.reload();
            }, 1500);
          }
        }
      ))
      .subscribe();
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }

  changeMessage() {
    this.translate.stream([
      "USER.EMAIL_REQUIRED",
      "USER.EMAIL_INVALID",
      "USER.MOBILE_NUMBER_INVALID",
      "USER.MOBILE_NUMBER_REQUIRED",
    ]).subscribe(translations => {
      if (this.registerForm.controls.email.invalid) {
        this.emailMessage = translations["USER.EMAIL_INVALID"];
        this.backendEmailError = false;
      } else if(this.registerForm.controls.email.value === ""){
        this.emailMessage = translations["USER.EMAIL_REQUIRED"];
        this.backendEmailError = false;
      }
      if (this.registerForm.controls.mobileNumber.invalid) {
        this.mobileNumberMessage = translations["USER.MOBILE_NUMBER_INVALID"];
        this.backendMobileNumberError = false;
      } else if(this.registerForm.controls.mobileNumber.value === ""){
        this.mobileNumberMessage = translations["USER.MOBILE_NUMBER_REQUIRED"];
        this.backendMobileNumberError = false;
      }
    });
  }

  protected readonly Array = Array;

  clearForm() {
    this.registerForm.reset();
    this.backendEmailError = false;
    this.backendMobileNumberError = false;
  }
}
