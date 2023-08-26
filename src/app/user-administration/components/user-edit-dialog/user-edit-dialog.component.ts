// @ts-nocheck
import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Campaign} from "../../../campaign-management/campaign";
import {CampaignService} from "../../../campaign-management/campaign.service";
import {RolesDialogService} from "../../../roles-dialog/roles-dialog.service";
import {MessageService} from "primeng/api";
import {tap} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Role} from "../../models/role";


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  @Input() userFromDB!: User;
  showDialog!: boolean;
  submitted!: boolean;
  allRoles!: Role[];
  user!: User
  allCampaigns!: Campaign[];

  emailMessage!: string;
  mobileNumberMessage!: string;
  errorMessage!: string;

  @Input() registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', Validators.pattern("^$|[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")],
    password: ['', Validators.pattern("^$|.{6,32}$")],
    mobileNumber: ['', Validators.pattern('^$|(?:(?:\\+?40)|0)?7\\d{8}$')],
    roles: new FormControl<Role[]>([], Validators.required),
    campaigns: [[]],
    active: [false]
  })
  backendEmailError: boolean = false
  backendMobileNumberError: boolean = false;


  constructor(
    private campaignService: CampaignService,
    private roleService: RolesDialogService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.allCampaigns = campaigns;
    });
    this.roleService.getRoles().subscribe(roles => {
      roles.forEach(role => role.permissions = [])
      this.allRoles = roles;
    });

    this.userFromDB.roles?.forEach(role => role.permissions = [])

    this.initializeForm()
  }

  openEdit() {
    this.user = {}
    this.initializeForm()
    this.submitted = false;
    this.showDialog = true;
  }


  updateUser() {
    this.submitted = true;

    this.user.id = this.userFromDB.id;
    if (this.registerForm.controls.firstName.dirty)
      this.user.firstName = this.registerForm.value.firstName;
    if (this.registerForm.controls.lastName.dirty)
      this.user.lastName = this.registerForm.value.lastName;
    if (this.registerForm.controls.email.dirty)
      this.user.email = this.registerForm.value.email;
    if (this.registerForm.controls.mobileNumber.dirty)
      this.user.mobileNumber = this.registerForm.value.mobileNumber;
    if (this.registerForm.controls.roles.dirty)
      this.user.roles = this.registerForm.controls.roles.value
    if (this.registerForm.controls.campaigns.dirty)
      this.user.campaigns = this.registerForm.controls.campaigns.value;
    if (this.registerForm.controls.password.dirty)
      this.user.password = this.registerForm.value.password;
    if (this.registerForm.controls.active.dirty)
      this.user.active = this.registerForm.value.active;

    this.userService.updateUser(this.user)
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
                this.emailMessage = translations["USER." + response.errorType];
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
              "USER.MODIFIED",
              "USER.DEACTIVATED",
              "USER.ACTIVATED",
              "USER.SUCCESS",
              "USER.INFO"
            ]).subscribe(translations => {
              this.messageService.add({
                severity: 'success',
                summary: translations["USER.SUCCESS"],
                detail: translations["USER.MODIFIED"]
              });
              if (this.registerForm.controls.active.dirty) {
                if (!this.registerForm.controls.active.value) {
                  this.messageService.add({
                    severity: 'info',
                    summary: translations["USER.INFO"],
                    detail: translations["USER.DEACTIVATED"]
                  });
                } else {
                  this.messageService.add({
                    severity: 'info',
                    summary: translations["USER.INFO"],
                    detail: translations["USER.ACTIVATED"]
                  });
                }
              }
            });
            this.showDialog = false;
            setTimeout(() => {
              document.location.reload();
            }, 1500);
          }
        }
      ))
      .subscribe(
        {
          next: (user => {
            this.userFromDB = user;
          })
        }
      );
  }

  hideDialog() {
    this.showDialog = false;
    this.registerForm.reset();
    this.submitted = false;
  }

  initializeForm() {
    this.clearForm();
    this.registerForm.get("firstName").setValue(this.userFromDB.firstName);
    this.registerForm.get("lastName").setValue(this.userFromDB.lastName);
    this.registerForm.get("email").setValue(this.userFromDB.email);
    this.registerForm.get("mobileNumber").setValue(this.userFromDB.mobileNumber);
    this.registerForm.get("roles").setValue(this.userFromDB.roles);
    console.log(this.registerForm.get("roles"))
    this.registerForm.get("campaigns").setValue(this.userFromDB.campaigns);
    this.registerForm.get("active").setValue(this.userFromDB.active);
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
      } else if (this.registerForm.controls.email.value === "") {
        this.emailMessage = translations["USER.EMAIL_REQUIRED"];
        this.backendEmailError = false;
      }
      if (this.registerForm.controls.mobileNumber.invalid) {
        this.mobileNumberMessage = translations["USER.MOBILE_NUMBER_INVALID"];
        this.backendMobileNumberError = false;
      } else if (this.registerForm.controls.mobileNumber.value === "") {
        this.mobileNumberMessage = translations["USER.MOBILE_NUMBER_REQUIRED"];
        this.backendMobileNumberError = false;
      }
    });
  }

  clearForm() {
    this.registerForm.reset();
    this.backendEmailError = false;
    this.backendMobileNumberError = false;
  }

  protected readonly Array = Array;
}
