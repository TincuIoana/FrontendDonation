import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";
import {Role} from "../../../roles-dialog/role";
import {Campaign} from "../../../campaign-management/campaign";
import {CampaignService} from "../../../campaign-management/campaign.service";
import {RolesDialogService} from "../../../roles-dialog/roles-dialog.service";


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit{
  showDialog!: boolean;
  submitted!: boolean;
  allRoles!: Role[];
  user!: User
  allCampaigns!: Campaign[];
  errorMessage!: string
  @Input() registerForm = this.fb.group( {
    firstName : [''],
    lastName : [''],
    email : ['', Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")],
    mobileNumber : ['', Validators.pattern('^(?:(?:\\+?40)|0)?7\\d{8}$')],
    roles : [[]],
    campaigns: [[]]
  })



  constructor(
    private campaignService: CampaignService,
    private roleService: RolesDialogService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
  }
  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.allCampaigns = campaigns;
    });
    this.roleService.getRoles().subscribe(roles => {
      this.allRoles = roles;
    });
  }

  openNew() {
    this.user = {}
    this.submitted = false;
    this.showDialog = true;
  }


  updateUser() {
    this.submitted = true;
    this.user.firstName = this.registerForm.value.firstName ?? "";
    this.user.lastName = this.registerForm.value.lastName ?? "";
    this.user.email = this.registerForm.value.email ?? "";
    this.user.mobileNumber = this.registerForm.value.mobileNumber ?? "";
    this.user.roles = this.registerForm.controls.roles.value ?? [];
    this.user.campaigns = this.registerForm.controls.campaigns.value ?? [];
    this.user.password = "test";
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'User created', life: 3000});
    this.userService.updateUser(this.user)
      .subscribe(() => this.userService.getUsers())
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
  }
}
